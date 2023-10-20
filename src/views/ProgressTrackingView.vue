<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Progress</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ProjectSelector />

        <ion-card-content>
          <!-- Progress Bar -->
          <ion-progress-bar :value="progressValue"></ion-progress-bar>

          <!-- Milestones List -->
          <ion-list>
            <ion-item v-for="milestone in milestones" :key="milestone.id">
              <ion-label>{{ milestone.name }} - {{ milestone.status ? 'Completed' : 'Pending' }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  IonLabel,
  IonHeader,
  IonPage,
  IonTitle,
  IonCard,
  IonCardContent,
  IonContent,
  IonToolbar,
  IonList,
  IonItem,
  IonProgressBar,
} from '@ionic/vue';
import { useProjectsStore } from '@/stores/projects';
import ProjectSelector from '@/components/ProjectSelector.vue';

const projectStore = useProjectsStore();

const projectId = ref(projectStore.selectedProjectId);

const milestones = ref(projectStore.milestones.filter(mat => mat.projectId === projectId.value));
const completedMilestones = computed(() => milestones.value.filter(m => m.completed).length);
const progressValue = computed(() => completedMilestones.value / milestones.value.length);
</script>
