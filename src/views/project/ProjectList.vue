<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Current projects:</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item
                    v-for="project in projects"
                    :key="project.id"
                    button
                    :detail="false"
                    :router-link="{ name: 'ProjectDetails', params: { projectId: project.id } }"
                  >
                    <ion-badge slot="end" :color="project.statusColor">{{ project.status }}</ion-badge>
                    <ion-label> {{ project.name }} </ion-label>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="6">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Your profile:</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list v-if="userStore.user">
                  <ion-item> User name: {{ userStore.user.username }} </ion-item>
                  <ion-item> Email: {{ userStore.user.email }} </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import {
  IonBadge,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
  onIonViewWillEnter,
} from '@ionic/vue';
import useUserStore from '@/stores/user';

const store = useProjectsStore();
const projects = ref();
const userStore = useUserStore();

onIonViewWillEnter(async () => {
  projects.value = await store.getUserProjects();
});
</script>
