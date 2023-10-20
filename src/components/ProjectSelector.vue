<template>
  <ion-list>
    <ion-item>
      <ion-select label="Selected Project" placeholder="Project" @ionChange="changeProjectId($event)">
        <ion-select-option v-for="project in projects" :key="project.id" :value="project.id">{{
          project.name
        }}</ion-select-option>
      </ion-select>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/vue';
import { useProjectsStore } from '@/stores/projects';
import { Project } from '@/models';
import { ref } from 'vue';

const projectStore = useProjectsStore();
const projects = ref<Project[]>(projectStore.projects);
const changeProjectId = (event: CustomEvent) => {
  projectStore.setSelectedProjectId(event.detail.value);
};
</script>
