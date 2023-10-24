<template>
  <ion-page>
    <ion-content fullscreen>
      <ion-grid fixed>
        <ion-row class="ion-align-items-center ion-justify-content-center">
          <ion-col size="auto" class="ion-text-center">
            <div style="width: 450px">
              <h1 class="ion-color-danger">404</h1>
              <div>Ooops... something went wrong.</div>

              <ion-button size="small" href="#" router-direction="back">Back</ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonGrid, IonRow, IonCol, IonPage } from '@ionic/vue';
</script>
