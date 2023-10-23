<template>
  <ion-page>
    <ion-header>
      <toolbar-nav :title="`Project: ${project.name}`" />
    </ion-header>

    <ion-content fullscreen class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle> </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col size="12" size-md="6" size-lg="6">
                <img
                  :alt="project.name"
                  :src="project.image.url ?? 'https://pixeltronic.info/strapi//uploads/code_5290465_640_34bc1fc40d.jpg'"
                />
              </ion-col>
              <ion-col size="12" size-md="6" size-lg="6">
                <p>{{ project.description }}</p>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col offset="0" offset-lg="6" offset-md="6" size="12" size-md="6" size-lg="6">
                <ion-list>
                  <ion-item>
                    <ion-select
                      label="Status"
                      v-model="project.status"
                      @ionChange="updateProjectStatus(project.id, $event.detail.value)"
                    >
                      <ion-select-option value="Not Started">Not Started</ion-select-option>
                      <ion-select-option value="In Progress">In Progress</ion-select-option>
                      <ion-select-option value="Completed">Completed</ion-select-option>
                    </ion-select>
                  </ion-item>
                  <ion-item>
                    <ion-toggle :checked="project.shared" @ionChange="onToggle($event)">Make public?</ion-toggle>
                  </ion-item>
                </ion-list>
                <ion-button disabled expand="block" size="small" @click="navigateToMaterialManagement"
                  >Manage Materials</ion-button
                >
                <ion-button expand="block" size="small" @click="navigateToMilestones">Milestones</ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
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
  IonContent,
  IonCard,
  IonCardHeader,
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
} from '@ionic/vue';
import Project, { ProjectStatus } from '@/models/Project';
import ToolbarNav from '@/components/ToolbarNav.vue';

const router = useRouter();
const route = useRoute();
const projectsStore = useProjectsStore();

const projectId = Number(route.params.projectId);
const project = ref<Array<Project>>(projectsStore.getProjectById(projectId));

const navigateToMaterialManagement = () => {
  router.push(`/project/${projectId}/material-management`);
};

const navigateToMilestones = () => {
  router.push(`/project/${projectId}/milestones`);
};

const onToggle = (evt: ToggleCustomEvent) => {
  projectsStore.shareProject(project.value);
};

const updateProjectStatus = (projectId: number, status: ProjectStatus) => {
  projectsStore.updateProjectStatus(projectId, status);
};
</script>

<style>
ion-thumbnail {
  --size: 200px;
}
</style>
