<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-list>
        <RecycleScroller class="scroller" :items="list" :item-size="156">
          <template #default="{ item }">
            <ion-card class="card-item">
              <ion-img :src="item.url" />

              <ion-card-header>
                <ion-card-title>{{item.title}}</ion-card-title>
                <ion-card-subtitle>{{ item.description }}</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                {{ item.description }}
              </ion-card-content>
            </ion-card>
          </template>
        </RecycleScroller>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonHeader, IonPage, IonTitle, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonList, IonContent, IonToolbar, onIonViewDidEnter} from '@ionic/vue';
import axios from 'axios';
import {RecycleScroller} from 'vue-virtual-scroller';
import {ref} from "vue";

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

const list = ref<Array<Article>>([] );

onIonViewDidEnter(async () => {
  try {
    const { data } = await axios.get('http://localhost:1337/api/articles');
    list.value =
      data.data.map((article: Article) => ({
        ...article.attributes,
        id: article.id,
      }));
  } catch (error) {
    console.log(error);
  }
});
</script>

<style  scoped>
.card-item {
  margin: 10px;
  min-height: 150px !important;
}
</style>
```