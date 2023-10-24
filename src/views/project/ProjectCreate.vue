<template>
  <ion-page>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="6">
            <ion-card>
              <ion-card-content>
                <ion-card-header>
                  <ion-card-title> Creat a new project: </ion-card-title>
                </ion-card-header>
                <ion-item>
                  <ion-input clear-input placeholder="Name" name="name" type="text" v-model="project.name"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input
                    clear-input
                    placeholder="Description"
                    name="description"
                    type="text"
                    v-model="project.description"
                  ></ion-input>
                </ion-item>
                <ion-list>
                  <ion-item lines="none" class="ion-margin-top">
                    <ion-input
                      type="file"
                      @change="handleFileChange"
                      clear-input
                      id="image"
                      name="image"
                      ref="imageRef"
                    />
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="12" size-md="6" size-lg="6">
            <ion-card>
              <ion-card-content>
                <ion-item lines="none">
                  <ion-label>Start date:</ion-label>
                  <ion-datetime-button datetime="datetime"></ion-datetime-button>
                </ion-item>

                <ion-item lines="none">
                  <ion-button slot="end" @click="addProject">Add project</ion-button>
                </ion-item>

                <ion-modal :keep-contents-mounted="true">
                  <ion-datetime
                    name="startDate"
                    id="datetime"
                    show-default-buttons
                    @on-ion-change="formatDate(project.startDate)"
                  ></ion-datetime>
                </ion-modal>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonModal,
  IonDatetimeButton,
  IonContent,
  IonDatetime,
  IonGrid,
  IonInput,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonLabel,
} from '@ionic/vue';
import { formatDate } from '@/utils/formatDate';
import { useProjectsStore } from '@/stores/projects';
import { reactive, ref } from 'vue';
import { Project } from '@/models';
import { uniqueId } from '@/utils/uniqueId';
import useUserStore from '@/stores/user';
import router from '@/router';
import { ProjectStatus } from '@/models/Project';

const projectsStore = useProjectsStore();
const userStore = useUserStore();

const defaultProject = () => ({
  id: uniqueId(),
  name: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(),
  user: userStore?.user?.username ?? '',
  status: ProjectStatus.NOT_STARTED,
});

const project = reactive<Record<string, any>>(defaultProject());
const selectedFile = ref<File>({} as File);
const imageRef = ref();

const addProject = async () => {
  try {
    const formData = createFormData();

    await projectsStore.addProject(formData, project as Project);

    resetForm();
    await router.push({ name: 'ProjectList' });
  } catch (error) {
    console.error('Failed to add project:', error);
  }
};

const createFormData = () => {
  const inputFieldNames = ['name', 'description', 'user', 'status', 'startDate'];
  const data = {} as Record<string, any>;
  const formData = new FormData();

  inputFieldNames.forEach(name => {
    data[name] = project[name];
  });

  formData.append('files.image', selectedFile.value, selectedFile.value.name);
  formData.append('data', JSON.stringify(data));

  return formData;
};

const resetForm = () => {
  Object.assign(project, defaultProject());
  selectedFile.value = {} as File;
  if (imageRef.value) {
    imageRef.value.$el.value = '';
  }
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    selectedFile.value = input.files[0];
  }
};
</script>
<style scoped>
ion-datetime {
  min-width: 100%;
}
</style>
