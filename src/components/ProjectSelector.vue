<template>
  <ion-list>
    <ion-item>
      <ion-select label="Select a Project" placeholder="Project" @ionChange="changeProjectId($event)">
        <ion-select-option v-for="project in props.projects" :key="project.id" :value="project.id">{{
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

const emit = defineEmits<{
  (e: 'update-project-id', id: number): void;
}>();

const props = defineProps<{
  projects: Project[];
}>();

const projectStore = useProjectsStore();
const changeProjectId = (event: CustomEvent) => {
  emit('update-project-id', event.detail.value);
  projectStore.setSelectedProjectId(event.detail.value);
};
</script>
