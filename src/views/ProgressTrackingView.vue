<template>
  <ion-page>
    <ion-header>
      <toolbar-nav title="Progress tracking" />
    </ion-header>

    <ion-content fullscreen class="ion-padding">
      <ion-card>
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <project-selector @update-project-id="setId($event)" :projects="projectStore.projects || []" />
            </ion-col>
            <ion-col size="12">
              <ion-card-header>
                <ion-card-title
                  >Your milestone progress so far ({{ filteredMilestones.completed.length }}/{{
                    milestones.length
                  }})</ion-card-title
                >
                <ion-card-subtitle>
                  <ion-progress-bar :value="progressValue" color="success"></ion-progress-bar>
                </ion-card-subtitle>
              </ion-card-header>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-card-content>
          <ion-item-group color="primary">
            <ion-grid>
              <ion-row>
                <ion-col size="12" size-md="6" size-lg="6" v-for="status in ['completed', 'inProgress']" :key="status">
                  <ion-item-divider :color="status === 'completed' ? 'success' : 'medium'">
                    <ion-label>{{ mapStatusToLabel(status) }}</ion-label>
                  </ion-item-divider>
                  <ion-item v-for="milestone in filteredMilestones[status]" :key="milestone.id">
                    {{ milestone.name }}
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item-group>
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
  IonCard,
  IonCardContent,
  IonItemGroup,
  IonItemDivider,
  IonContent,
  IonItem,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonCardSubtitle,
  IonCardTitle,
  IonProgressBar,
} from '@ionic/vue';
import { useProjectsStore } from '@/stores/projects';
import { Status } from '@/models/Milestone';
import ToolbarNav from '@/components/ToolbarNav.vue';
import ProjectSelector from '@/components/ProjectSelector.vue';

const projectStore = useProjectsStore();
const milestones = ref(projectStore.milestones);

const filteredMilestones = computed(() => {
  const group = {
    completed: [],
    inProgress: [],
  };

  milestones.value.forEach(m => {
    if (projectStore.selectedProjectId == m.projectId) {
      if (m.status === Status.Completed) group.completed.push(m);
      else group.inProgress.push(m);
    }
  });

  return group;
});

const progressValue = computed(() => filteredMilestones.value.completed.length / milestones.value.length);

const setId = (id: number) => {
  projectStore.selectedProjectId = id;
};

const mapStatusToLabel = (status: string) => {
  if (status === 'completed') return 'Completed';
  if (status === 'inProgress') return 'In Progress';
  else return 'Not Started';
};
</script>
<script setup lang="ts"></script>
<script setup lang="ts"></script>
