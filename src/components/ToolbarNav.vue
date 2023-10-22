<template>
  <ion-toolbar>
    <ion-title class="ion-text-center">{{ title }}</ion-title>
    <ion-buttons slot="start">
      <ion-back-button color="medium" text="Back" :icon="chevronBack" default-href="/"></ion-back-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button @click="logout">
        <ion-label color="medium">Logout</ion-label>
        <ion-icon color="medium" size="large" :icon="logOut"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</template>

<script setup lang="ts">
import { IonBackButton, IonTitle, IonLabel, IonIcon, IonButton, IonButtons, IonToolbar } from '@ionic/vue';
import { chevronBack, logOut } from 'ionicons/icons';
import { useUserStore } from '@/stores/user';

defineProps<{
  title: string;
}>();

const userStore = useUserStore();
const logout = () => userStore.logout();
</script>
