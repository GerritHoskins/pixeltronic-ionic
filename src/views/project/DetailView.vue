<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ project.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>
            <ion-thumbnail> <img :alt="project.name" :src="project.image.url" /> </ion-thumbnail
          ></ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>{{ project.description }}</p>
          <ion-button size="small" @click="navigateToMaterialManagement">Manage Materials</ion-button>
          <ion-button size="small" @click="navigateToMilestones">Milestones</ion-button>
          <ion-select
            label="Track process"
            v-model="project.status"
            @ionChange="updateProjectStatus(project.id, $event.detail.value)"
          >
            <ion-select-option value="Not Started">Not Started</ion-select-option>
            <ion-select-option value="In Progress">In Progress</ion-select-option>
            <ion-select-option value="Completed">Completed</ion-select-option>
          </ion-select>

          <!-- Community Sharing Button -->
          <ion-toggle @ionChange="shareProject">Make public?</ion-toggle>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useRouter, useRoute } from 'vue-router';
import {
  IonHeader,
  IonPage,
  IonToggle,
  IonCardSubtitle,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonThumbnail,
  IonCardContent,
  IonToolbar,
  IonButton,
  IonSelectOption,
  IonSelect,
} from '@ionic/vue';

const router = useRouter();
const route = useRoute();
const projectsStore = useProjectsStore();

const projectId = Number(route.params.projectId);
const project = ref(projectsStore.getProjectById(projectId));

const navigateToMaterialManagement = () => {
  router.push(`/project/${projectId}/material-management`);
};

const navigateToMilestones = () => {
  router.push(`/project/${projectId}/milestones`);
};

const shareProject = () => projectsStore.shareProject(project.value);

const updateProjectStatus = (projectId: number, status: 'Not Started' | 'In Progress' | 'Completed') => {
  projectsStore.updateProjectStatus(projectId, status);
};
</script>

<style>
ion-thumbnail {
  --size: 200px;
}
</style>
