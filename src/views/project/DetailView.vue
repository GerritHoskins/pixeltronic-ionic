<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ project.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>{{ project.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{ project.description }}</p>

          <!-- Links to other project-related features can be added here -->
          <ion-button @click="navigateToMaterialManagement">Manage Materials</ion-button>
          <!-- ... other features (milestones, community share, etc.) -->
          <ion-button @click="navigateToMilestones">Milestones</ion-button>
          <!-- Progress Tracking Dropdown -->
          <ion-select
            label="Track process"
            v-model="project.status"
            @ionChange="updateProjectStatus(project.id, $event.detail.value)"
          >
            <ion-select-option value="Not Started">Not Started</ion-select-option>
            <ion-select-option value="In Progress">In Progress</ion-select-option>
            <ion-select-option value="Completed">Completed</ion-select-option>
          </ion-select>

          <!-- Community Sharing Button -->
          <ion-button @click="toggleShareModal"> Share </ion-button>
          <share-project @close-share-modal="toggleShareModal" :show="showShareModal" :project-id="project.id" />

          <ion-button @click="toggleCommentModal">Comment</ion-button>
          <comment @close-comment-modal="toggleCommentModal" :show="showCommentModal" :project-id="project.id" />
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useRouter, useRoute } from 'vue-router';
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonToolbar,
  IonButton,
  IonSelectOption,
  IonSelect,
} from '@ionic/vue';
import ShareProject from '@/components/ShareProject.vue';
import Comment from '@/components/Comment.vue';

const router = useRouter();
const route = useRoute();
const projectsStore = useProjectsStore();

const projectId = Number(route.params.projectId);
const project = ref(projectsStore.getProjectById(projectId));
const showShareModal = ref(false);
const showCommentModal = ref(false);

const navigateToMaterialManagement = () => {
  router.push(`/project/${projectId}/material-management`);
};

const navigateToMilestones = () => {
  router.push(`/project/${projectId}/milestones`);
};

const toggleCommentModal = () => {
  //router.push(`/project/${projectId}/comments`);
  showCommentModal.value = !showCommentModal.value;
};

const toggleShareModal = () => {
  //router.push(`/project/${projectId}/share`);
  showShareModal.value = !showShareModal.value;
};

const updateProjectStatus = (projectId: number, status: 'Not Started' | 'In Progress' | 'Completed') => {
  projectsStore.updateProjectStatus(projectId, status);
};
</script>
