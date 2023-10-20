<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Add project</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <add-project :show="true" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import AddProject from '@/components/modals/AddProjectModal.vue';
</script>
