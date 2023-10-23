<template>
  <ion-col size="12" size-md="6" size-lg="6">
    <ion-card class="custom-card">
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="6">
            <ion-card-header class="ion-padding">
              <ion-card-title>{{ project?.name }}</ion-card-title>
              <ion-card-subtitle>By: {{ project?.user }}</ion-card-subtitle>
              <ion-img
                class="ion-padding-top"
                :alt="project?.name"
                :src="project?.image?.url ?? 'https://pixeltronic.info/strapi//uploads/code_5290465_640_34bc1fc40d.jpg'"
              />
              <ion-badge :color="progressColor(project.status)">{{ project.status }}</ion-badge>
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
  IonAccordion,
  IonAccordionGroup,
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/vue';
import { ProjectStatus } from '@/models/Project';
import { useUserStore } from '@/stores/user';
import { ProgressColor } from '@/models/ProgressColor';

defineProps({
  project: Object,
});

const progressColor = (status: ProjectStatus) => {
  return status === ProjectStatus.COMPLETED
    ? ProgressColor.SUCCESS
    : status === ProjectStatus.IN_PROGRESS
    ? ProgressColor.WARNING
    : ProgressColor.DEFAULT;
};
</script>

<style scoped>
.custom-card {
  min-height: 300px;
}
</style>
