<template>
  <div>
    <div v-for="comment in comments" :key="comment.projectId">
      <p>
        <strong>{{ comment?.commentedBy }}</strong
        >: {{ comment?.comment }}
      </p>
    </div>
    <ion-input v-model="newComment" placeholder="Add a comment..."></ion-input>
    <ion-button size="small" @click="addComment">Post Comment</ion-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { IonButton, IonInput } from '@ionic/vue';
import { Comment } from '@/models';

const props = defineProps<{
  //show: boolean;
  projectId: number;
}>();

const emit = defineEmits<{
  (e: 'close-comment-modal'): void;
}>();

const projectsStore = useProjectsStore();
const filteredComments = computed(() => {
  return projectsStore.getCommentsByProjectId(props.projectId);
});

const comments = ref<Comment[]>(filteredComments.value);
watch(
  () => filteredComments.value,
  newVal => {
    comments.value = newVal;
  }
);

const newComment = ref('');
const addComment = () => {
  if (newComment.value) {
    const comment: Comment = {
      projectId: props.projectId,
      comment: newComment.value,
      commentedBy: 'CurrentUser', //TODO: user management
      commentedOn: undefined,
    };
    projectsStore.addComment(comment);

    newComment.value = '';
  }
};
</script>
