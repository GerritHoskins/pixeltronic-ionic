<template>
  <ion-page>
    <ion-header>
      <toolbar-nav title="My projects" />
    </ion-header>
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
                    :router-link="`/project/${project.id}`"
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
                <ion-card-title>Profile information: </ion-card-title>
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
  IonBadge,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
} from '@ionic/vue';
import ToolbarNav from '@/components/ToolbarNav.vue';
import useUserStore from '@/stores/user';

const router = useRouter();
const projectsStore = useProjectsStore();
const userStore = useUserStore();
const projects = ref(projectsStore.getUserProjects());
</script>
