import { defineStore } from 'pinia';
import { Comment, Material, Milestone, Project, State } from '@/models';
import {
  strapiAddMaterials,
  strapiAddProject,
  strapiGetMaterials,
  strapiGetProjects,
  strapiUpdateProject,
} from '@/api/strapi';
import { ProjectStatus } from '@/models/Project';
import { ProgressColor } from '@/models/ProgressColor';
import useUserStore from '@/stores/user';
import { useApiResponseMapper } from '@/composables/useApiResponseMapper';
import { useAsyncQueue } from '@vueuse/core';
import useCommentStore from '@/stores/comment';
import useMilestoneStore from '@/stores/milestone';

export const useProjectsStore = defineStore('project', {
  state: (): State => ({
    initialized: false,
    selectedProjectId: undefined,
    project: [] as Project[],
    milestone: [] as Milestone[],
    material: [] as Material[],
    comment: [] as Comment[],
  }),

  getters: {
    getProjectById: state => (projectId: number) => {
      return state.project.find(p => Number(p.id) === projectId);
    },

    getUserProjects: state => () => {
      const userStore = useUserStore();
      return state.project.filter(p => p.user === userStore?.user?.username);
    },
  },

  actions: {
    async initialize() {
      this.initialized = false;

      const userStore = useUserStore();
      const commentStore = useCommentStore();
      const milestoneStore = useMilestoneStore();

      const { result } = useAsyncQueue([
        this.fetchProjects,
        userStore.syncUser,
        commentStore.fetchComments,
        milestoneStore.fetchMilestones,
      ]);

      if (result) {
        this.initialized = true;
      }
    },

    async fetchProjects() {
      const { mapper } = useApiResponseMapper();
      const response = await strapiGetProjects();
      this.project = await mapper(response, 'project');
      return [...this.project];
    },

    async fetchSharedProjects(filter: string) {
      const { mapper } = useApiResponseMapper();
      const response = await strapiGetProjects(filter);
      return mapper(response, 'project');
    },

    async fetchMaterials() {
      const { mapper } = useApiResponseMapper();
      const response = await strapiGetMaterials();
      this.material = mapper(response, 'material');
    },

    setSelectedProjectId(projectId: number) {
      this.selectedProjectId = projectId;
    },

    async addProject(project: Project) {
      await strapiAddProject(project);
      this.project?.push(project);
    },

    async addMaterial(material: Material) {
      await strapiAddMaterials(material);
      this.material.push(material);
    },

    async updateProjectStatus(projectId: number, status: ProjectStatus) {
      this.project.find(project => {
        if (project.id === projectId) {
          project.status = status ?? ProjectStatus.NOT_STARTED;
          project.statusColor =
            status === ProjectStatus.COMPLETED
              ? ProgressColor.SUCCESS
              : status === ProjectStatus.IN_PROGRESS
              ? ProgressColor.WARNING
              : ProgressColor.DEFAULT;

          return strapiUpdateProject(project);
        }
      });
    },

    async shareProject(project: Project) {
      const projectToShare = this.project.find(p => p.id === project.id);
      if (projectToShare) {
        projectToShare.shared = true;
        await strapiUpdateProject(projectToShare);
      }
      await strapiGetProjects();
    },
  },
});
