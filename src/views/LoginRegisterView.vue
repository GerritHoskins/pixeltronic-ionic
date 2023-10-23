<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title v-if="isLogin">Login</ion-title>
        <ion-title v-else>Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="custom-content">
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <ion-item v-if="!isLogin">
                <ion-input placeholder="User name" v-model="userData.user.username" type="text"></ion-input>
              </ion-item>
              <ion-item>
                <ion-input placeholder="Email" v-model="userData.user.email" type="email"></ion-input>
              </ion-item>
              <ion-item>
                <ion-input placeholder="Password" v-model="userData.user.password" type="password"></ion-input>
              </ion-item>
              <ion-button
                class="ion-margin-top"
                size="small"
                expand="block"
                @click="isLogin ? loginUser() : registerUser()"
              >
                {{ isLogin ? 'Login' : 'Register' }}
              </ion-button>
              <p @click="isLogin = !isLogin">
                {{ isLogin ? 'Need an account? Register' : 'Already have an account? Login' }}
              </p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonGrid,
  IonRow,
  IonInput,
  IonButton,
  IonCol,
} from '@ionic/vue';
import User, { UserType } from '@/models/User';
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/user';

const isLogin = ref(true);

const userData = reactive<User>({
  user: {} as UserType,
  jwt: '',
});

const router = useRouter();
const store = useUserStore();
const loginUser = async () => {
  const user: UserType = {
    username: (userData?.username as string) || '',
    email: (userData.email as string) || '',
    password: (userData.password as string) || '',
  };
  await store.login({ user, jwt: userData.jwt });
  await router.push('/project-list');
};

const registerUser = async () => {
  const user: UserType = {
    username: (userData?.username as string) || '',
    email: (userData.email as string) || '',
    password: (userData.password as string) || '',
  };
  await store.register({ user, jwt: userData.jwt });
  isLogin.value = false;
  await router.push('/login-register');
};
</script>

<style scoped>
.custom-content {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
</style>
