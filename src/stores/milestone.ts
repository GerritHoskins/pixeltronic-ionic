import { strapiAddMilestone, strapiGetMilestones, strapiUpdateMilestone } from '@/api/strapi';
import { Milestone } from '@/models';
import { MilestoneStatus } from '@/models/Milestone';
import { ProgressColor } from '@/models/ProgressColor';
import { defineStore } from 'pinia';
import { useApiResponseMapper } from '@/composables/useApiResponseMapper';

const useMilestoneStore = defineStore('milestone', {
  state: () => ({
    milestone: [] as Milestone[],
  }),

  getters: {
    getMilestonesByProjectId: state => (projectId: number) => {
      return state.milestone.filter(m => Number(m.projectId) === projectId);
    },
  },

  actions: {
    async fetchMilestones(filter?: string) {
      const { mapper } = useApiResponseMapper();
      const response = await strapiGetMilestones(filter);
      this.milestone = await mapper(response, 'milestone');
      return [...this.milestone];
    },

    async addMilestone(milestone: Milestone) {
      await strapiAddMilestone(milestone);
      this.milestone.push(milestone);
    },

    async markMilestoneAsCompleted(milestoneId: number) {
      const milestoneIndex = this.milestone.findIndex(m => m.id === milestoneId);
      if (milestoneIndex !== -1) {
        this.milestone[milestoneIndex].status = MilestoneStatus.COMPLETED;
        this.milestone[milestoneIndex].statusColor = ProgressColor.SUCCESS;
      }

      await strapiUpdateMilestone(this.milestone[milestoneIndex]);
    },
  },
});

export default useMilestoneStore;
