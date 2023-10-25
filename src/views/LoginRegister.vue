<template>
  <ion-page>
    <ion-header>
      <toolbar-nav :title="isLogin ? 'Login' : 'Redirect'" :show-back="false" :show-logout="false" />
    </ion-header>
    <ion-content class="ion-padding">
      <div class="custom-content">
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <ion-item v-if="!isLogin">
                <ion-input clear-input placeholder="User name" v-model="userData.username" type="text"></ion-input>
              </ion-item>
              <ion-item>
                <ion-input clear-input placeholder="Email" v-model="userData.email" type="email"></ion-input>
              </ion-item>
              <ion-item class="ion-margin-top">
                <ion-input clear-input placeholder="Password" v-model="userData.password" type="password"></ion-input>
              </ion-item>
              <ion-item lines="none">
                <ion-button
                  class="ion-margin-top custom-ion-button"
                  size="small"
                  @click="isLogin ? loginUser() : registerUser()"
                >
                  {{ isLogin ? 'Login' : 'Register' }}
                </ion-button>
              </ion-item>
              <ion-item lines="none">
                <div @click="isLogin = !isLogin">
                  {{ isLogin ? 'Need an account? Register' : 'Already have an account? Login' }}
                </div>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { IonPage, IonHeader, IonContent, IonItem, IonGrid, IonRow, IonInput, IonButton, IonCol } from '@ionic/vue';
import User, { UserType } from '@/models/User';
import { useRouter } from 'vue-router';
import useUserStore from '@/stores/user';
import ToolbarNav from '@/components/ToolbarNav.vue';

const isLogin = ref(true);

const userData = reactive({
  username: '',
  email: '',
  password: '',
  jwt: '',
});

const router = useRouter();
const store = useUserStore();

const createUserFromData = (): User => ({
  user: {
    username: userData.username || '',
    email: userData.email || '',
    password: userData.password || '',
  } as UserType,
  jwt: userData.jwt || '',
});

const loginUser = async () => {
  await store.login(createUserFromData());
  await router.push({ path: '/project/list' });
};

const registerUser = async () => {
  await store.register(createUserFromData());
  isLogin.value = true;
};
</script>

<style scoped>
.custom-content {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.custom-ion-button {
  width: 100%;
}
</style>
