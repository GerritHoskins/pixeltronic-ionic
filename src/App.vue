<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
import { useProjectsStore } from '@/stores/projects';

const projectStore = useProjectsStore();
onMounted(() => projectStore.fetchProjects());
</script>
