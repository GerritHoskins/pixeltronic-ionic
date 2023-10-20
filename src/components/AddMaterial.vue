<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Material Management</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Display the list of materials for the project -->
      <ion-list v-if="materials && materials.length">
        <ion-item v-for="material in materials" :key="material.id">
          <ion-label> {{ material.name }} ({{ material.acquired }}/{{ material.quantity }}) </ion-label>
          <!-- Button to edit the material -->
          <ion-button @click="editMaterial(material)">Edit</ion-button>
        </ion-item>
      </ion-list>

      <!-- Add a new material form -->
      <ion-list>
        <ion-item>
          <ion-input label="Material Name" v-model="newMaterial.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Quantitiy" v-model.number="newMaterial.quantity" type="number"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Acquired" v-model.number="newMaterial.acquired" type="number"></ion-input>
        </ion-item>
        <ion-button @click="addMaterial">Add Material</ion-button>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Material } from '@/models';
import { useProjectsStore } from '@/stores/projects';
import { useRouter, useRoute } from 'vue-router';
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonLabel,
  IonContent,
  IonToolbar,
  IonInput,
  IonList,
  IonItem,
  IonButton,
} from '@ionic/vue';

const router = useRouter();
const route = useRoute();

const projectsStore = useProjectsStore();

// Extract the projectId from the route parameters
const projectId = Number(route.params.projectId);

const materials = ref(projectsStore.materials.filter(m => m.projectId === projectId));

const newMaterial = ref<Partial<Material>>({
  name: '',
  quantity: 0,
  acquired: 0,
});

const addMaterial = () => {
  if (newMaterial.value.name && newMaterial.value?.quantity > 0) {
    const material: Material = {
      id: Date.now(),
      projectId: projectId,
      name: newMaterial.value.name,
      quantity: newMaterial.value.quantity ?? 0,
      acquired: newMaterial.value.acquired || 0,
    };
    projectsStore.addMaterial(material);
    materials.value.push(material);

    // Reset the form
    newMaterial.value = {
      name: '',
      quantity: 0,
      acquired: 0,
    };
  }
  router.push(`/project-list`);
};

const editMaterial = (material: Material) => {
  // Navigate to a separate "EditMaterial" component with the material ID.
  // For now, we're just adding a placeholder function. Implementing this would require an additional component.
  console.log(`Editing material with ID: ${material.id}`);
};
</script>
