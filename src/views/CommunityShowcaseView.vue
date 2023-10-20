<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Community Showcase</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Community Showcase</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <ion-item v-for="project in sharedProjects" :key="project.id">
              <ion-avatar slot="start">
                <img :alt="project.name" v-if="project.image" :src="project.image" />
              </ion-avatar>
              <ion-label>
                <h2>{{ project.title }}</h2>
                <p>{{ project.description }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonList,
  IonLabel,
  IonTitle,
  IonHeader,
  IonPage,
  IonAvatar,
  IonItem,
  IonCardHeader,
  IonToolbar,
  IonContent,
  IonCardTitle,
  IonCard,
  IonCardContent,
} from '@ionic/vue';
import { useProjectsStore } from '@/stores/projects';

const projectStore = useProjectsStore();

const sharedProjects = ref(projectStore.sharedProjects); // Mock data or fetched from a store
</script>
