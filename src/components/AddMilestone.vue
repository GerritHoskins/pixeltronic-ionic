<template>
  <ion-item>
    <ion-input label="Milestone Name" v-model="milestone.name"></ion-input>
  </ion-item>
  <ion-item>
    <ion-textarea label="Description" v-model="milestone.description"></ion-textarea>
  </ion-item>
  <ion-item>
    <ion-datetime
      @on-ion-change="formatDate(milestone.targetCompletionDate)"
      :prefer-wheel="true"
      presentation="month-year"
    >
      <span slot="title">Target Completion Date</span>
    </ion-datetime>
  </ion-item>

  <ion-button size="small" @click="addMilestone">Add Milestone</ion-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Milestone } from '@/models';
import { useProjectsStore } from '@/stores/projects';
import { useRouter, useRoute } from 'vue-router';
import { IonItem, IonDatetime, IonTextarea, IonButton, IonInput } from '@ionic/vue';
import { formatDate } from '@/utils/formatDate';

const projectsStore = useProjectsStore();
const route = useRoute();

const projectId = Number(route.params.projectId);

const milestone = ref<Milestone>({
  completedMilestones: [],
  status: 'Not Started',
  id: Date.now(),
  projectId: projectId,
  name: '',
  description: '',
  targetCompletionDate: new Date(),
});

const addMilestone = () => {
  projectsStore.addMilestone(milestone.value);
};
</script>
