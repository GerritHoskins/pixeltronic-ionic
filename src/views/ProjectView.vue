<template>
  <ion-page>
    <ion-header>
      <toolbar-nav title="My projects" show-back show-logout />
    </ion-header>
    <ion-content>
      <ion-router-outlet></ion-router-outlet>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="router.push({ name: 'AddProject' })">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { add } from 'ionicons/icons';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import ToolbarNav from '@/components/ToolbarNav.vue';
const router = useRouter();
</script>
