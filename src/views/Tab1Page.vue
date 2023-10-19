<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Strapi CMS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-card class="card-item" v-for="item in list" :key="item.id">
        <ion-card-header>
          <ion-thumbnail>
            <img :alt="item.title" :src="item.url" />
          </ion-thumbnail>
          <ion-card-title>{{ item.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          {{ item.description }}
        </ion-card-content>
      </ion-card>
      <ion-infinite-scroll>
        <ion-infinite-scroll-content
          loading-text="Please wait..."
          loading-spinner="bubbles"
        ></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonContent,
  IonToolbar,
  IonThumbnail,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  onIonViewDidEnter,
} from '@ionic/vue';
import axios from 'axios';
import { ref } from 'vue';

interface Article {
  id: string | number;
  attributes: ArticleAttributes;
}

interface ArticleAttributes {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  link: string;
}

const list = ref<Array<Article>>([]);

onIonViewDidEnter(async () => {
  try {
    const { data } = await axios.get('https://pixeltronic.info/strapi/api/articles');
    list.value = data.data.map((article: Article) => ({
      ...article.attributes,
      id: article.id,
    }));
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.card-item {
  margin: 10px;
  min-height: 120px !important;
}
ion-thumbnail {
  --size: 40px;
  --border-radius: 0;
}
</style>
```
