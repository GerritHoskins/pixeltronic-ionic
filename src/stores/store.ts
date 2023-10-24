import { defineStore } from 'pinia';
import useUserStore from '@/stores/user';
import useCommentStore from '@/stores/comment';
import useMilestoneStore from '@/stores/milestone';
import { useProjectsStore } from '@/stores/projects';

const useStore = defineStore('store', {
  state: () => ({
    initialized: false,
  }),

  actions: {
    async initialize() {
      try {
        const projectStore = useProjectsStore();
        const userStore = useUserStore();
        const commentStore = useCommentStore();
        const milestoneStore = useMilestoneStore();

        await projectStore.fetchProjects();
        await userStore.syncUser();
        await commentStore.fetchComments();
        await milestoneStore.fetchMilestones();

        this.initialized = true;
      } catch (error) {
        console.error('Initialization failed: ', error);
      }
    },
  },
});

export default useStore;
