<template>
  <ion-content class="ion-padding">
    <ion-modal :is-open="show" :initial-breakpoint="1" :breakpoints="[0, 1]">
      <ion-header>
        <toolbar-nav :title="project.name" show-back show-logout />
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item>
            <ion-input clear-input placeholder="Name" v-model="project.name"></ion-input>
          </ion-item>
          <ion-item>
            <ion-textarea clear-input placeholder="Description" v-model="project.description"></ion-textarea>
          </ion-item>
          <ion-item>
            <ion-datetime clear-input @on-ion-change="formatDate(project.startDate)"></ion-datetime>
          </ion-item>
        </ion-list>
        <ion-button @click="addProject">Add Project</ion-button>
      </ion-content>
    </ion-modal>
  </ion-content>
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
  IonModal,
  IonContent,
} from '@ionic/vue';
import { formatDate } from '@vueuse/core';
import { uniqueId } from '@/utils/uniqueId';
import ToolbarNav from '@/components/ToolbarNav.vue';

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
