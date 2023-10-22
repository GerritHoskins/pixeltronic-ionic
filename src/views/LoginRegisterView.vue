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
                <ion-input placeholder="User name" v-model="userData.username" type="text"></ion-input>
              </ion-item>
              <ion-item>
                <ion-input placeholder="Email" v-model="userData.email" type="email"></ion-input>
              </ion-item>
              <ion-item>
                <ion-input placeholder="Password" v-model="userData.password" type="password"></ion-input>
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
import User from '@/models/User';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const isLogin = ref(true);

const userData = reactive<User>({
  username: '',
  email: '',
  password: '',
});

const router = useRouter();
const store = useUserStore();
const loginUser = async () => {
  const user: User = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };
  await store.login(user);
  await router.push('/project-list');
};

const registerUser = async () => {
  const user: User = {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };
  await store.register(user);
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
