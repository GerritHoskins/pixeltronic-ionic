<template>
  <ion-modal :is-open="show">
    <ion-header>
      <ion-toolbar>
        <ion-title>Comment on Project</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="closeModal">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div>
        <!-- Display Comments -->

        <div v-for="comment in comments" :key="comment.sharedProjectId">
          <p>
            <strong>{{ comment?.commentedBy }}</strong
            >: {{ comment?.comment }}
          </p>
        </div>

        <!-- Comment Form -->
        <ion-input v-model="newComment" placeholder="Add a comment..."></ion-input>
        <ion-button @click="addComment">Post Comment</ion-button>
      </div>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonModal, IonTitle, IonToolbar } from '@ionic/vue';
import { Comment } from '@/models';

const props = defineProps<{
  show: boolean;
  projectId: number;
}>();

const emit = defineEmits<{
  (e: 'close-comment-modal', show: boolean): void;
}>();

const projectsStore = useProjectsStore();

const comments = ref(projectsStore.comments.filter(comment => comment.projectId === props.projectId));

const newComment = ref('');
const addComment = () => {
  if (newComment.value) {
    const comment: Comment = {
      projectId: props.projectId,
      sharedProjectId: Date.now(),
      comment: newComment.value,
      commentedBy: 'CurrentUser', //TODO: user management
      commentedOn: Date.now(),
    };
    projectsStore.addComment(comment);

    newComment.value = '';
  }
};

const closeModal = () => emit('close-comment-modal');
</script>
