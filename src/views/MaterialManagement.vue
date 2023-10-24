<template>
  <ion-page>
    <ion-header>
      <toolbar-nav title="Material Management" />
    </ion-header>

    <ion-content fullscreen class="ion-padding">
      <project-selector @update-project-id="projectId = $event" :projects="projectStore.project || []" />
      <ion-list>
        <ion-item v-for="material in materials" :key="material.id">
          <ion-label>{{ material.name }}</ion-label>
          <ion-buttons slot="end">
            <!-- <ion-button @click="editMaterial(material)">Edit</ion-button>-->
            <ion-button @click="removeMaterial(material.id)" color="danger">Delete</ion-button>
          </ion-buttons>
        </ion-item>
        <ion-item>
          <ion-input label="Material name" v-model="newMaterial.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Quantitiy" v-model.number="newMaterial.quantity" type="number"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input label="Acquired" v-model.number="newMaterial.acquired" type="number"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button @click="addMaterial">Add</ion-button>

      <!--  <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo.filepath" v-for="photo in photos">
            <ion-img :src="photo.webviewPath" @click="showActionSheet(photo)"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonHeader,
  IonPage,
  IonLabel,
  IonContent,
  IonInput,
  IonList,
  IonItem,
  IonButtons,
  IonButton,
} from '@ionic/vue';
import { Material } from '@/models';
import { useProjectsStore } from '@/stores/projects';
import ProjectSelector from '@/components/ProjectSelector.vue';
import { uniqueId } from '@/utils/uniqueId';
import ToolbarNav from '@/components/ToolbarNav.vue';

/*import { UserPhoto } from '@/composables/usePhotoGallery';

const { photos, takePhoto, loadSaved, cachePhotos, deletePhoto } = usePhotoGallery();
watch(photos, cachePhotos);
onMounted(loadSaved);*/

const projectStore = useProjectsStore();
const projectId = ref(projectStore.selectedProjectId);
const materials = ref<Material[]>(projectStore.material.filter(mat => mat.projectId === projectId.value));

const newMaterial = ref<Partial<Material>>({
  id: 0,
  projectId: 0,
  name: '',
  quantity: 0,
  acquired: 0,
});

const addMaterial = () => {
  const quantity = newMaterial.value?.quantity ?? 0;
  if (newMaterial.value.name && quantity) {
    const material: Material = {
      id: uniqueId(),
      projectId: projectId.value,
      name: newMaterial.value.name,
      quantity: newMaterial.value.quantity ?? 0,
      acquired: newMaterial.value.acquired || 0,
    };
    projectStore.addMaterial(material);

    // Reset the form
    newMaterial.value = {
      id: 0,
      projectId: 0,
      name: '',
      quantity: 0,
      acquired: 0,
    };
  }
};

//const editMaterial = (material: Material) => {
//TODO: Implement edit functionality, potentially showing a modal or another view.
//};

const removeMaterial = (materialId: number) => {
  materials.value = materials.value.filter(m => m.id !== materialId);
};

/*const showActionSheet = async () => {
  const actionSheet = await actionSheetController.create({
    header: 'Photos',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        icon: trash,
        handler: () => {
          //deletePhoto(photo);
        },
      },
      {
        text: 'Cancel',
        icon: close,
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
        },
      },
    ],
  });
  await actionSheet.present();
};*/
</script>
