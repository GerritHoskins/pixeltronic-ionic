<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My projects</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <ion-list>
        <ion-item v-for="project in projects" :key="project.id" button :detail="false">
          <ion-label> {{ project.name }} </ion-label>
          <ion-button slot="end" @click="navigateToProjectDetail(project.id)">View</ion-button>
        </ion-item>
      </ion-list>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content
          loading-text="Please wait..."
          loading-spinner="bubbles"
        ></ion-infinite-scroll-content>
      </ion-infinite-scroll>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="toggleNewProjectModal">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <AddProjectModal :show="showNewProjectModal" @close-new-project-modal="toggleNewProjectModal" />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useRouter } from 'vue-router';
import { add } from 'ionicons/icons';
import {
  IonFab,
  IonFabButton,
  IonIcon,
  InfiniteScrollCustomEvent,
  IonHeader,
  IonPage,
  IonTitle,
  IonContent,
  IonToolbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonLabel,
  IonItem,
  IonButton,
} from '@ionic/vue';
import AddProjectModal from '@/components/modals/AddProjectModal.vue';

const router = useRouter();
const projectsStore = useProjectsStore();
const projects = ref(projectsStore.projects);
const showNewProjectModal = ref(false);

const navigateToProjectDetail = (projectId: number) => {
  router.push(`/project/${projectId}`);
};

const toggleNewProjectModal = () => {
  //router.push('/add-project');
  showNewProjectModal.value = !showNewProjectModal.value;
};

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  setTimeout(() => ev.target.complete(), 500);
};
</script>
