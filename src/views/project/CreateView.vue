<template>
  <ion-page>
    <ion-header>
      <toolbar-nav title="Add new project" />
    </ion-header>
    <ion-content fullscreen class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="12" size-lg="6">
            <ion-item>
              <ion-input clear-input placeholder="Name" v-model="project.name"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input clear-input placeholder="Description" v-model="project.description"></ion-input>
            </ion-item>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="3">
            <ion-item>
              <ion-datetime clear-input @on-ion-change="formatDate(project.startDate)"></ion-datetime>
            </ion-item>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="3">
            <ion-item>
              <ion-datetime clear-input @on-ion-change="formatDate(project.startDate)"></ion-datetime>
            </ion-item>
          </ion-col>
          <ion-col size="12">
            <ion-button expand="block" @click="addProject">Add Project</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonItem,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonDatetime,
  IonButton,
  IonInput,
  IonHeader,
  IonContent,
} from '@ionic/vue';
import { formatDate } from '@/utils/formatDate';
import ToolbarNav from '@/components/ToolbarNav.vue';
import { useProjectsStore } from '@/stores/projects';
import { ref } from 'vue';
import { Project } from '@/models';
import { uniqueId } from '@/utils/uniqueId';

const projectsStore = useProjectsStore();

const project = ref<Project>({
  id: uniqueId(),
  name: '',
  description: '',
  startDate: new Date(),
});

const addProject = () => projectsStore.addProject(project.value);
</script>
