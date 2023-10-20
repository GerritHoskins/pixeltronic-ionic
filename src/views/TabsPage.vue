<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="ProjectsListView" href="/project-list">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="ProgressTracking" href="/progress-tracking">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Progress</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="CommunityShowCase" href="/community-showcase">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Showcase</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="MaterialManagement" href="material-management">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Materials</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { square } from 'ionicons/icons';
</script>
