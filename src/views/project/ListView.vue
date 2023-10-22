<template>
  <ion-page>
    <ion-header>
      <toolbar-nav title="My projects" />
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item
          v-for="project in projects"
          :key="project.id"
          button
          :detail="false"
          :router-link="`/project/${project.id}`"
        >
          <ion-badge slot="end" :color="statusColor(project.status)">{{ project.status }}</ion-badge>
          <ion-label> {{ project.name }} </ion-label>
        </ion-item>
      </ion-list>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content
          loading-text="Please wait..."
          loading-spinner="bubbles"
        ></ion-infinite-scroll-content>
      </ion-infinite-scroll>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="router.push('/add-project')">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { useRouter } from 'vue-router';
import { add } from 'ionicons/icons';
import {
  InfiniteScrollCustomEvent,
  IonBadge,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/vue';
import { Status } from '@/models/Project';
import ToolbarNav from '@/components/ToolbarNav.vue';

const router = useRouter();
const projectsStore = useProjectsStore();
const projects = ref(projectsStore.projects);

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  setTimeout(() => ev.target.complete(), 500);
};

const statusColor = (status: Status) => {
  if (status === Status.InProgress) return 'warning';
  if (status === Status.NotStarted) return 'medium';
  return 'success';
};
</script>
