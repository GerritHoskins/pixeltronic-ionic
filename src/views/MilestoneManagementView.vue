<template>
  <ion-page>
    <ion-header>
      <toolbar-nav title="Milestone Manager" />
    </ion-header>
    <ion-content fullscreen class="ion-padding">
      <ion-list>
        <ion-item v-for="milestone in milestones" :key="milestone.id">
          <ion-label>{{ milestone.name }}</ion-label>
          <ion-button color="tertiary" @click="markAsCompleted(milestone?.id)" v-if="milestone.status !== 'Completed'"
            >Mark as Completed</ion-button
          >
          <ion-button color="success" v-else>Completed</ion-button>
        </ion-item>
        <ion-item>
          <ion-input v-model="newMilestoneName" placeholder="New Milestone"></ion-input>
          <ion-button slot="end" size="small" @click="addMilestone">Add</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { uniqueId } from '@/utils/uniqueId';
import Milestone, { Status } from '@/models/Milestone';
import { strapiGetMilestones } from '@/api/strapi';
import ToolbarNav from '@/components/ToolbarNav.vue';

const route = useRoute();

const projectsStore = useProjectsStore();
const projectId = Number(route.params.projectId);

const milestones = ref<Milestone[]>();
const newMilestoneName = ref('');
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    milestones.value = await projectsStore.fetchMilestones(`filters[projectId][$eq]=${projectId}`);
  } catch (e) {
    error.value = true;
  } finally {
    loading.value = false;
  }
});

const addMilestone = async () => {
  if (newMilestoneName.value) {
    const milestone = {
      id: uniqueId(),
      projectId,
      name: newMilestoneName.value,
      status: Status.InProgress,
    };
    await projectsStore.addMilestone(milestone);
    newMilestoneName.value = '';
    milestones.value.push(milestone);
    await strapiGetMilestones();
  }
};

const markAsCompleted = (milestoneId: number, status: Status) => {
  projectsStore.markMilestoneAsCompleted(milestoneId, status);
};
</script>
