import { defineStore } from 'pinia';
import { State } from '@/models';
import { strapiAuthLogin, strapiAuthRegister } from '@/api/strapi';
import User from '@/models/User';
import { Preferences } from '@capacitor/preferences';
import router from '@/router';

export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: null,
    jwt: '',
  }),

  getters: {
    userName: state => async () => {
      const { value } = await Preferences.get({ key: 'userData' });
      return (JSON.parse(value).username || state.user.username) ?? 'unknown';
    },
  },

  actions: {
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
      this.user = null;
      this.jwt = '';
      await router.push('/login-register');
    },
  },
});
