<template>
  <ion-item>
    <ion-input type="file" @change="handleFileChange" id="file" name="file" ref="file" />
  </ion-item>
  <ion-button @click="uploadPicture">Upload</ion-button>
</template>

<script setup lang="ts">
import { IonButton, IonInput, IonItem } from '@ionic/vue';
import { ref } from 'vue';
import { strapiUploadImage } from '@/api/strapi';

const emits = defineEmits<{
  (e: 'upload-completed', url: Record<string, any>): void;
}>();

const selectedFile = ref<File | null>(null);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    selectedFile.value = input.files[0];
  }
};

const uploadPicture = async () => {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append('files', selectedFile.value);

  const data = await strapiUploadImage(formData);
  const image = {
    image: {
      data: data,
    },
  };
  emits('upload-completed', image);
};
</script>
