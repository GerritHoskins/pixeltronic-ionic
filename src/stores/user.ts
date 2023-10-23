import { defineStore } from 'pinia';
import { strapiAuthLogin, strapiAuthRegister } from '@/api/strapi';
import User from '@/models/User';
import { Preferences } from '@capacitor/preferences';
import router from '@/router';

const useUserStore = defineStore('user', {
  state: (): User => ({
    user: JSON.parse(window.localStorage.getItem('CapacitorStorage.userData') ?? '') ?? null,
    jwt: window.localStorage.getItem('CapacitorStorage.jwt') ?? '',
  }),

  getters: {
    userName: state => async () => {
      const { value } = await Preferences.get({ key: 'userData' });
      if (!value) return 'unknown';
      return (JSON.parse(value).username || state?.user?.username) ?? 'unknown';
    },
  },

  actions: {
    async syncUser() {
      const userData = await Preferences.get({ key: 'userData' });
      if (!userData.value) return;
      this.user = JSON.parse(userData.value);

      const jwtData = await Preferences.get({ key: 'jwt' });
      if (!jwtData.value) return;
      this.jwt = jwtData.value;
    },

    async login(userData: User) {
      const result = await strapiAuthLogin(userData);
      const { jwt, user } = result.data.value;
      this.user = user;
      this.jwt = jwt;

      //persist
      await Preferences.set({
        key: 'jwt',
        value: jwt,
      });

      await Preferences.set({
        key: 'userData',
        value: JSON.stringify(user),
      });
    },

    async register(user: User) {
      await strapiAuthRegister(user);
    },

    async logout() {
      await Preferences.clear();
      this.user = undefined;
      this.jwt = '';
      await router.push('/login-register');
    },
  },
});

export default useUserStore;
