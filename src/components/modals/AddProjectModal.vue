<template>
  <ion-modal :is-open="show">
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Project</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item>
          <ion-input placeholder="Project Name" v-model="project.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-textarea placeholder="Description" v-model="project.description"></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-datetime @on-ion-change="formatDate(project.startDate)"></ion-datetime>
        </ion-item>
      </ion-list>
      <ion-button @click="addProject">Add Project</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Project } from '@/models';
import { useProjectsStore } from '@/stores/projects';
import {
  IonItem,
  IonList,
  IonDatetime,
  IonTextarea,
  IonButton,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonModal,
  IonButtons,
  IonContent,
} from '@ionic/vue';
import { formatDate } from '@vueuse/core';
import { uniqueId } from '@/utils/uniqueId';

defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close-new-project-modal', show: boolean): void;
}>();

const projectsStore = useProjectsStore();

const project = ref<Project>({
  id: uniqueId(),
  name: '',
  description: '',
  startDate: new Date(),
});

const addProject = () => {
  projectsStore.addProject(project.value);
  // Redirect or reset fields after adding
  // router.push(`/project-list`);
  closeModal();
};

const closeModal = () => emit('close-new-project-modal', true);
</script>
