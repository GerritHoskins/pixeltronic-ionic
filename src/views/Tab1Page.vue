<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Strapi CMS & infinite scrolling</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card v-for="item in list" :key="item.id">
        <ion-card-header>
          <ion-card-title>{{ item.title }}</ion-card-title>
          <ion-img v-if="item.image.url" :alt="item.image.alternativeText" :src="item.image.url" />
        </ion-card-header>
        <ion-card-content>
          {{ item.description }}
        </ion-card-content>
      </ion-card>
      <ion-infinite-scroll @ionInfinite="ionInfinite">
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
  IonContent,
  IonToolbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonCard,
  IonCardHeader,
  IonImg,
  IonCardTitle,
  onIonViewDidEnter,
  InfiniteScrollCustomEvent,
} from '@ionic/vue';
import axios from 'axios';
import { reactive, ref } from 'vue';

interface Article {
  id: string | number;
  title: string;
  description: string;
  image: ImageAttributes;
  link: string;
}

interface ImageAttributes {
  url: string | null;
  alternativeText: string;
  caption: string;
}

interface ApiResponse {
  id: string | number;
  attributes: {
    id: number;
    title: string;
    description: string;
    image: {
      data: {
        attributes: ImageAttributes;
      };
    };
    link: string;
  };
}

const BASE_URL = 'https://pixeltronic.info/strapi';

const list = reactive([] as Article[]);

onIonViewDidEnter(async () => getArticles());

const getArticles = async () => {
  try {
    const response = await axios.get<ApiResponse[]>(
      `${BASE_URL}/api/articles?populate=*&pagination[page]=1&pagination[pageSize]=5`
    );
    const articles = response.data?.data;

    articles.map(({ id, attributes }) => {
      const { title, description, link, image } = attributes;
      const imageUrl = image.data?.attributes.url;
      list.push({
        id,
        title,
        description,
        link,
        image: {
          url: imageUrl ? `${BASE_URL}${imageUrl}` : null,
          alternativeText: image.data?.attributes.alternativeText ?? '',
          caption: image.data?.attributes.caption ?? '',
        },
      });
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
};

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  getArticles();
  setTimeout(() => ev.target.complete(), 500);
};
</script>
