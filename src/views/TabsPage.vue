<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom" v-if="isLoggedIn">
        <ion-tab-button tab="Project" href="/project/list">
          <ion-icon aria-hidden="true" :icon="hammer" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="ProgressTracking" href="/progress-tracking">
          <ion-icon aria-hidden="true" :icon="list" />
          <ion-label>Progress</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="CommunityShowCase" href="/community-showcase">
          <ion-icon aria-hidden="true" :icon="newspaper" />
          <ion-label>Showcase</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="MaterialManagement" href="material-management">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Materials</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  loadingController,
} from '@ionic/vue';
import { square, hammer, list, newspaper } from 'ionicons/icons';
import { onMounted, ref, watch } from 'vue';
import useUserStore from '@/stores/user';

const userStore = useUserStore();
const isLoggedIn = ref(false);

watch(
  () => userStore.jwt,
  newVal => {
    isLoggedIn.value = !!newVal;
  }
);

onMounted(async () => {
  const loading = await loadingController.create({
    message: 'Loading...',
    duration: 300,
  });
  await loading.present();
});
</script>
