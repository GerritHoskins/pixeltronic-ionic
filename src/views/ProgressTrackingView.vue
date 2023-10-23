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
                <span v-if="projectId"> ({{ completedMilestones.length }}/{{ milestones.length }}) </span>
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
                v-if="milestones.length > 0"
                :color="value === MilestoneStatus.COMPLETED ? ProgressColor.SUCCESS : ProgressColor.DEFAULT"
                :class="{ 'text-color-white ': value === MilestoneStatus.COMPLETED }"
                class="text-bolder"
              >
                <ion-label>{{ mapStatusToLabel(value) }}</ion-label>
              </ion-item-divider>
              <ion-item v-for="milestone in milestones" :key="milestone.id">
                <template v-if="milestone.status === value">
                  {{ milestone.name }}
                </template>
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

const completedMilestones = computed(() => {
  const completed: Milestone[] = [];

  if (!projectId.value) return completed;
  if (milestones.value)
    milestones.value?.filter(milestone => {
      if (milestone.status === MilestoneStatus.COMPLETED) completed.push(milestone);
    });

  return completed;
});

const progressValue = computed(() => completedMilestones.value.length / milestones.value?.length);
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
</script>

<style scoped>
.text-color-white {
  color: #ffffff;
}
.text-bolder {
  font-weight: 500;
}
</style>
