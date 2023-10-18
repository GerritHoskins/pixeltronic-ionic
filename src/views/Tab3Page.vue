<template>
  <ion-page>
    <div>
      <div id="webview" />
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, onIonViewWillEnter, onIonViewDidEnter} from '@ionic/vue';
import { InAppBrowser } from "pixeltronic-webview-browser/src";

onIonViewWillEnter(async () => {
    const el = document.getElementById('webview');
    if (!el) return;
    await InAppBrowser.openWebView({
      url: 'https://pixeltronic.dev',
      element: el,
    })
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