<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Manage Milestones</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- List of milestones -->
      <ion-list>
        <ion-item v-for="milestone in milestones" :key="milestone.id">
          <ion-label>{{ milestone.name }}</ion-label>
          <ion-button @click="markAsCompleted(milestone.id)" v-if="!milestone.completed">Mark as Completed</ion-button>
        </ion-item>
      </ion-list>

      <!-- Add new milestone -->
      <ion-item>
        <ion-input
          v-model="newMilestoneName"
          :clear-input="true"
          placeholder="New Milestone"
          :value="newMilestoneName"
        ></ion-input>
        <ion-button slot="end" @click="addMilestone">Add</ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import {
  IonLabel,
  IonHeader,
  IonPage,
  IonTitle,
  IonContent,
  IonInput,
  IonToolbar,
  IonList,
  IonItem,
  IonButton,
} from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router';
import { uniqueId } from '@/utils/uniqueId';

const router = useRouter();
const route = useRoute();

const projectsStore = useProjectsStore();
const projectId = Number(route.params.projectId);
//const { projectId } = toRefs(props);
const milestones = projectsStore.getMilestonesByProjectId(projectId);

const newMilestoneName = ref('');

const addMilestone = () => {
  if (newMilestoneName.value) {
    projectsStore.addMilestone({
      id: uniqueId(),
      projectId,
      name: newMilestoneName.value,
      completed: false,
    });
    newMilestoneName.value = '';
    router.back(); // Return to the previous view after adding the milestone
  }
};

const markAsCompleted = (milestoneId: number) => {
  projectsStore.markMilestoneAsCompleted(milestoneId);
};
</script>
