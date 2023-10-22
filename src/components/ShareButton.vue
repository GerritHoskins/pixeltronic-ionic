<template>
  <div>
    <ion-button :id="`open-${project.name}-action-sheet`">
      <ion-icon slot="icon-only" :icon="shareSocialSharp"></ion-icon
    ></ion-button>
    <ion-action-sheet
      :trigger="`open-${project.name}-action-sheet`"
      :buttons="actionSheetButtons"
      header="Share this project"
      @didDismiss="shareAction($event)"
    ></ion-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { shareSocialSharp } from 'ionicons/icons';
import { IonIcon, IonButton, IonActionSheet } from '@ionic/vue';

defineProps({
  project: Object,
});

const shareAction = async (evt: CustomEvent) => {
  if (!evt?.detail?.data?.action) return;
  const currentUrl = encodeURIComponent(window.location.href);
  if (evt.detail.data.action === 'facebook') {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + currentUrl, '_blank');
  } else {
    window.open('https://api.whatsapp.com/send?text=' + currentUrl, '_blank');
  }
};

const actionSheetButtons = [
  {
    text: 'WhatsApp',
    data: {
      action: 'whatsapp',
    },
  },
  {
    text: 'Facebook',
    data: {
      action: 'facebook',
    },
  },
  {
    text: 'Cancel',
    role: 'cancel',
    data: {
      action: 'cancel',
    },
  },
];
</script>
