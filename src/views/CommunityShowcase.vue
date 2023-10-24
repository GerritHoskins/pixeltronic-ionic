<template>
  <ion-page>
    <ion-header>
      <toolbar-nav title="Community Showcase" />
    </ion-header>

    <ion-content v-if="loading">
      <p>Loading...</p>
    </ion-content>

    <ion-content v-else-if="error">
      <p>Failed to load projects. Please try again later.</p>
    </ion-content>

    <ion-content v-else>
      <ion-grid>
        <ion-row>
          <project-card v-for="project in projects" :key="project?.id" :project="project" />
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonHeader, IonPage, IonContent, IonGrid, IonRow } from '@ionic/vue';
import { useProjectsStore } from '@/stores/projects';
import ProjectCard from '@/components/ProjectCard.vue';
import ToolbarNav from '@/components/ToolbarNav.vue';

const projectStore = useProjectsStore();
const projects = ref([]);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    projects.value = await projectStore.fetchSharedProjects('filters[shared][$eq]=true');
  } catch (e) {
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>
