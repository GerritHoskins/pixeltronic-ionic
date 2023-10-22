<template>
  <ion-col size="12" size-md="6" size-lg="6">
    <ion-card class="custom-card">
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="6">
            <ion-card-header class="ion-padding">
              <ion-card-title>{{ project?.name }}</ion-card-title>
              <ion-card-subtitle>By: {{ userName }}</ion-card-subtitle>
              <ion-img class="ion-padding-top" :alt="project?.name" :src="project?.image?.url" />
              <ion-badge :color="project.status === Status.Completed ? 'success' : 'medium'">{{
                project.status
              }}</ion-badge>
            </ion-card-header>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="6">
            <ion-card-content class="ion-padding">
              <share-button :project="project" />
              <ion-text class="ion-padding"
                ><h3>{{ project?.description }}</h3></ion-text
              >
            </ion-card-content>
          </ion-col>
          <ion-col size="12">
            <ion-accordion-group>
              <ion-accordion value="first">
                <ion-item slot="header" color="light">
                  <ion-label>Comments</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content"><comment-accordion :project-id="project?.id" /></div>
              </ion-accordion>
            </ion-accordion-group>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card>
  </ion-col>
</template>

<script setup lang="ts">
import ShareButton from '@/components/ShareButton.vue';
import CommentAccordion from '@/components/CommentAccordion.vue';
import {
  IonBadge,
  IonImg,
  IonText,
  IonItem,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonAccordion,
  IonLabel,
  IonAccordionGroup,
  IonCardContent,
  IonGrid,
  IonCardSubtitle,
  IonRow,
  IonCol,
} from '@ionic/vue';
import { Status } from '@/models/Project';
import { useUserStore } from '@/stores/user';
import { asyncComputed } from '@vueuse/core';

defineProps({
  project: Object,
});

const userStore = useUserStore();
const userName = asyncComputed(async () => await userStore.userName());
</script>

<style scoped>
.custom-card {
  min-height: 300px;
}
</style>
