<template>
  <ion-modal :is-open="show">
    <ion-header>
      <ion-toolbar>
        <ion-title>Share Project</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Share your project with the community:</p>
      <ion-button @click="shareOnPlatform('')">Share in Community</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { Share } from '@capacitor/share';
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/vue';
import { useProjectsStore } from '@/stores/projects';

const props = defineProps<{
  show: boolean;
  projectId: number;
}>();

const emit = defineEmits<{
  (e: 'close-share-modal', show: boolean): void;
}>();

const projectsStore = useProjectsStore();

const closeModal = () => emit('close-share-modal', false);

const shareOnPlatform = async (platform: string) => {
  if (!platform) {
    await Share.share({
      title: 'Check out this Project',
      text: 'I think this project is really interesting!',
      url: 'https://myproject.com/',
      dialogTitle: 'Share with other project lovers',
    });
  } else {
    // TODO: authentication system.
    projectsStore.shareProject(props.projectId, 'userID123');
  }
};
</script>
