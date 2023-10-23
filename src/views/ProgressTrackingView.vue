<template>
  <ion-page>
    <ion-header>
      <toolbar-nav title="Progress tracking" />
    </ion-header>

    <ion-content fullscreen class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="6">
            <project-selector @update-project-id="setId($event)" :projects="projectStore.getUserProjects() || []" />
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="6">
            <ion-card-header>
              <ion-card-title
                >Your milestone progress so far
                <span v-if="projectId"> ({{ filteredMilestones.completed.length }}/{{ milestones.length }}) </span>
              </ion-card-title>
              <ion-card-subtitle>
                <ion-progress-bar :value="progressValue" :color="progressColor"></ion-progress-bar>
              </ion-card-subtitle>
            </ion-card-header>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-item-group>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="6" size-lg="6" v-for="(value, key) in MilestoneStatus" :key="key">
              <ion-item-divider
                v-if="filteredMilestones[mapStatusToArrayKey(value)].length > 0"
                :color="value === MilestoneStatus.COMPLETED ? ProgressColor.SUCCESS : ProgressColor.DEFAULT"
                :class="{ 'text-color-white ': value === MilestoneStatus.COMPLETED }"
                class="text-bolder"
              >
                <ion-label>{{ mapStatusToLabel(value) }}</ion-label>
              </ion-item-divider>
              <ion-item v-for="milestone in filteredMilestones[mapStatusToArrayKey(value)]" :key="milestone.id">
                {{ milestone.name }}
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item-group>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonRow,
} from '@ionic/vue';
import { useProjectsStore } from '@/stores/projects';
import Milestone, { MilestoneStatus } from '@/models/Milestone';
import ToolbarNav from '@/components/ToolbarNav.vue';
import ProjectSelector from '@/components/ProjectSelector.vue';
import { ProgressColor } from '@/models/ProgressColor';
import useMilestoneStore from '@/stores/milestone';

const projectStore = useProjectsStore();
const milestoneStore = useMilestoneStore();
const projectId = ref();

const milestones = computed(() => {
  if (!projectId.value) return [] as Milestone[];
  return milestoneStore.milestone.filter(m => m.projectId === projectId.value);
});

const filteredMilestones = computed(() => {
  const group = {
    inProgress: [] as Milestone[],
    notStarted: [] as Milestone[],
    completed: [] as Milestone[],
  };

  if (!projectId.value) return group;
  if (milestones.value)
    milestones.value?.forEach(milestone => {
      if (milestone.status === MilestoneStatus.COMPLETED) group.completed.push(milestone);
      else if (milestone.status === MilestoneStatus.IN_PROGRESS) group.inProgress.push(milestone);
      else group.notStarted.push(milestone);
    });

  return group;
});

const progressValue = computed(() => filteredMilestones.value.completed.length / milestones.value?.length);
const progressColor = computed(() => {
  if (progressValue.value === 0) return ProgressColor.DEFAULT;
  return progressValue.value > 70
    ? ProgressColor.SUCCESS
    : progressValue.value > 40
    ? ProgressColor.WARNING
    : ProgressColor.DANGER;
});

const setId = (id: number) => {
  projectId.value = id;
  projectStore.selectedProjectId = id;
};

const mapStatusToLabel = (status: MilestoneStatus) => {
  if (status === MilestoneStatus.COMPLETED) return 'Completed Milestones';
  if (status === MilestoneStatus.IN_PROGRESS) return 'Milestones In Progress';
  return 'Not yet started Milestones';
};

const mapStatusToArrayKey = (status: MilestoneStatus) => {
  if (status === MilestoneStatus.COMPLETED) return 'completed';
  if (status === MilestoneStatus.IN_PROGRESS) return 'inProgress';
  return 'notStarted';
};
</script>

<style scoped>
.text-color-white {
  color: #ffffff;
}
.text-bolder {
  font-weight: 500;
}
</style>
