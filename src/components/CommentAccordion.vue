<template>
  <div>
    <div v-for="comment in comments" :key="comment?.projectId">
      <p>
        <strong>{{ comment?.commentedBy }}</strong
        >: {{ comment?.comment }}
      </p>
    </div>
    <ion-input v-model="newComment" placeholder="Add a comment..."></ion-input>
    <ion-button class="ion-margin-top" slot="end" expand="block" size="small" @click="addComment"
      >Post Comment</ion-button
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import { IonButton, IonInput } from '@ionic/vue';
import { Comment } from '@/models';
import { useUserStore } from '@/stores/user';

const props = defineProps<{
  projectId: number;
}>();

const projectStore = useProjectsStore();
const comments = ref<Array<Comment>>(projectStore.comments);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    comments.value = await projectStore.fetchSharedComments(`filters[projectId][$eq]=${props.projectId}`);
  } catch (e) {
    error.value = true;
  } finally {
    loading.value = false;
  }
});

const userStore = useUserStore();
const newComment = ref('');
const addComment = async () => {
  if (newComment.value) {
    const comment: Comment = {
      projectId: props.projectId,
      comment: newComment.value,
      commentedBy: await userStore.userName(),
      commentedOn: new Date(),
    };

    // Optimistically add the comment to UI
    comments.value.push(comment);

    try {
      await projectStore.addComment(comment);
      newComment.value = '';
    } catch (error) {
      comments.value.pop();
      console.error('Failed to add comment:', error);
    }
  }
};
</script>
