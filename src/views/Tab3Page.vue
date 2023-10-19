<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Webview overlay</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <div v-if="isNative">
        <div id="webview" />
      </div>
      <ion-grid v-else>
        <ion-row class="ion-align-items-center">
          <ion-col push="3">
            <div>This feature is only supported for native devices.</div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  onIonViewWillEnter,
  onIonViewDidEnter,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';
import { InAppBrowser } from 'pixeltronic-webview-browser';
import { Capacitor } from '@capacitor/core';
import { computed } from 'vue';

const isNative = computed(() => Capacitor.isNativePlatform());

onIonViewWillEnter(async () => {
  const el = document.getElementById('webview');
  if (!el) return;
  await InAppBrowser.openWebView({
    url: 'https://pixeltronic.dev',
    element: el,
  });
});

onIonViewDidEnter(async () => {
  await InAppBrowser.showWebView();
});
</script>

<style scoped>
#webview {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>
