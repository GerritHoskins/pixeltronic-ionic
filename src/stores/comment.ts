import { defineStore } from 'pinia';
import { Comment } from '@/models';
import { strapiAddComment, strapiGetComments } from '@/api/strapi';
import { useApiResponseMapper } from '@/composables/useApiResponseMapper';

const useCommentStore = defineStore('comment', {
  state: () => ({
    comment: [] as Comment[],
  }),

  getters: {
    getCommentsByProjectId: state => (projectId: number) => {
      return state.comment.filter(c => Number(c.projectId) === projectId);
    },
  },
  actions: {
    async fetchComments() {
      const { mapper } = useApiResponseMapper();
      const response = await strapiGetComments();
      this.$state.comment = mapper(response, 'comment');
    },

    async fetchSharedComments(filter: string) {
      const { mapper } = useApiResponseMapper();
      const response = await strapiGetComments(filter);
      return mapper(response, 'comments');
    },

    async addComment(commentToAdd: Comment) {
      if (!commentToAdd) return;
      await strapiAddComment(commentToAdd as any);
      this.$state.comment.push(commentToAdd);
    },
  },
});

export default useCommentStore;
