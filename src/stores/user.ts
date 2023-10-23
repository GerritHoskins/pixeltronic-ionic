import { defineStore } from 'pinia';
import { setRequestInterceptor, strapiAuthLogin, strapiAuthRegister } from '@/api/strapi';
import User, { UserType } from '@/models/User';
import { Preferences } from '@capacitor/preferences';
import router from '@/router';

const useUserStore = defineStore('user', {
  state: (): User => ({
    user: {} as UserType,
    jwt: '',
  }),

  getters: {
    userName: state => async () => {
      const { value } = await Preferences.get({ key: 'userData' });
      if (!value) return '';
      return (JSON.parse(value)?.username || state?.user?.username) ?? '';
    },
  },

  actions: {
    async persistData(key: string, value: string) {
      try {
        await Preferences.set({ key, value });
      } catch (error) {
        console.error(`Error persisting ${key}: `, error);
      }
    },

    async syncUser() {
      try {
        const userData = await Preferences.get({ key: 'userData' });
        const jwtData = await Preferences.get({ key: 'jwt' });

        if (jwtData.value) setRequestInterceptor(jwtData.value);

        if (userData.value) this.user = JSON.parse(userData.value);
        if (jwtData.value) this.jwt = jwtData.value;
      } catch (error) {
        console.error('Error syncing user: ', error);
      }
    },

    async login(userData: User) {
      try {
        const result = await strapiAuthLogin(userData);
        const { jwt, user } = result.data.value;

        this.user = user;
        this.jwt = jwt;

        await this.persistData('jwt', jwt);
        await this.persistData('userData', JSON.stringify(user));
      } catch (error) {
        console.error('Login failed: ', error);
      }
    },

    async register(user: User) {
      try {
        await strapiAuthRegister(user);
      } catch (error) {
        console.error('Registration failed: ', error);
      }
    },

    async logout() {
      try {
        await Preferences.clear();
        this.user = {} as UserType;
        this.jwt = '';
        router.push('/login-register');
      } catch (error) {
        console.error('Logout failed: ', error);
      }
    },
  },
});

export default useUserStore;
