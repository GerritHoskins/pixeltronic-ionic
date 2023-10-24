<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="6">
            <ion-card>
              <ion-card-content>
                <img
                  :alt="project?.name"
                  :src="
                    project?.image?.url ?? 'https://pixeltronic.info/strapi/uploads/code_5290465_640_34bc1fc40d.jpg'
                  "
                />
                <p>{{ project?.description }}</p>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Project settings:</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item>
                    <ion-select
                      label="Status"
                      v-model="project.status"
                      @ionChange="updateProjectStatus(project?.id, $event.detail.value)"
                    >
                      <ion-select-option value="Not Started">Not Started</ion-select-option>
                      <ion-select-option value="In Progress">In Progress</ion-select-option>
                      <ion-select-option value="Completed">Completed</ion-select-option>
                    </ion-select>
                  </ion-item>
                  <ion-item>
                    <ion-toggle :checked="project?.shared" @ionChange="onToggle($event)">Make public?</ion-toggle>
                  </ion-item>
                </ion-list>
                <ion-button disabled expand="block" size="small" @click="navigateToMaterialManagement"
                  >Manage Materials</ion-button
                >
                <ion-button expand="block" size="small" @click="navigateToMilestones">Milestones</ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useRouter, useRoute } from 'vue-router';
import {
  IonPage,
  IonToggle,
  IonContent,
  IonCard,
  IonList,
  IonCardContent,
  IonButton,
  IonItem,
  IonSelectOption,
  IonSelect,
  ToggleCustomEvent,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/vue';
import Project, { ProjectStatus } from '@/models/Project';

const router = useRouter();
const route = useRoute();
const projectsStore = useProjectsStore();

const projectId = Number(route.params.projectId);
const project = ref<Project>(projectsStore.project.find(p => p.id === projectId) ?? ({} as Project));

const navigateToMaterialManagement = () => {
  router.push(`/project/${projectId}/material-management`);
};

const navigateToMilestones = () => {
  router.push(`/project/${projectId}/milestones`);
};

const onToggle = (evt: ToggleCustomEvent) => {
  if (!project.value) return;
  return projectsStore.shareProject(project.value);
};

const updateProjectStatus = (projectId: number | undefined, status: ProjectStatus) => {
  if (projectId) {
    projectsStore.updateProjectStatus(projectId, status);
  }
};
</script>

<style>
ion-thumbnail {
  --size: 200px;
}
</style>
