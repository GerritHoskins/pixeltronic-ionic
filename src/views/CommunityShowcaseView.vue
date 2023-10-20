<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Community Showcase</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="sharedProjects">
      <ion-card v-for="project in sharedProjects" :key="project.id">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-button id="open-action-sheet">
                <ion-icon slot="icon-only" :icon="shareSocialSharp"></ion-icon
              ></ion-button>
              <ion-action-sheet
                trigger="open-action-sheet"
                :buttons="actionSheetButtons"
                header="Share this project"
                @didDismiss="shareAction($event)"
              ></ion-action-sheet>

              <ion-img :alt="project.name" :src="project.image.url" />
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-card-header>
          <ion-card-title>{{ project.title }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-text color="primary"
            ><h3>{{ project.description }}</h3></ion-text
          >
        </ion-card-content>
        <ion-accordion-group>
          <ion-accordion value="first">
            <ion-item slot="header" color="light">
              <ion-label>Comments</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content"><CommentModal :project-id="project.id" /></div>
          </ion-accordion>
        </ion-accordion-group>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { shareSocialSharp } from 'ionicons/icons';

import {
  IonTitle,
  IonImg,
  IonIcon,
  IonHeader,
  IonText,
  IonItem,
  IonPage,
  IonCardHeader,
  IonToolbar,
  IonContent,
  IonCardTitle,
  IonCard,
  IonAccordion,
  IonLabel,
  IonAccordionGroup,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonActionSheet,
} from '@ionic/vue';
import { useProjectsStore } from '@/stores/projects';
import CommentModal from '@/components/modals/CommentModal.vue';

const projectStore = useProjectsStore();
const sharedProjects = ref(projectStore.sharedProjects);

const shareAction = async (evt: CustomEvent) => {
  if (!evt.detail.data.action) return;
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
