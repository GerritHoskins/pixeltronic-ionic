import { defineStore } from 'pinia';
import { Comment, Material, Milestone, Project, State } from '@/models';
import {
  strapiAddComment,
  strapiAddMaterials,
  strapiAddMilestone,
  strapiAddProject,
  strapiGetComments,
  strapiGetMaterials,
  strapiGetMilestones,
  strapiGetProjects,
  strapiUpdateMilestone,
  strapiUpdateProject,
} from '@/api/strapi';
import { MilestoneStatus } from '@/models/Milestone';
import { ProjectStatus } from '@/models/Project';
import { ProgressColor } from '@/models/ProgressColor';
import { useUserStore } from '@/stores/user';

export const useProjectsStore = defineStore('projects', {
  state: (): State => ({
    initialized: false,
    selectedProjectId: undefined,
    projects: [],
    milestones: [],
    materials: [],
    comments: [],
  }),

  getters: {
    getMilestonesByProjectId: state => (projectId: number) => {
      return state.milestones.filter(m => Number(m.projectId) === projectId);
    },

    getCommentsByProjectId: state => (projectId: number) => {
      return state.comments.filter(c => Number(c.projectId) === projectId);
    },

    getProjectById: state => (projectId: number) => {
      return state.projects.find(p => Number(p.id) === projectId);
    },

    getUserProjects: state => () => {
      const userStore = useUserStore();
      return state.projects.filter(p => p.user === userStore.user.username);
    },
  },

  actions: {
    async fetchProjects() {
      const response = await strapiGetProjects();
      this.projects = await this.mapApiResponseToStructure(response, 'projects');
      return [...this.projects];
    },

    async fetchSharedProjects(filter: string) {
      const response = await strapiGetProjects(filter);
      return this.mapApiResponseToStructure(response, 'projects');
    },

    async fetchComments() {
      const response = await strapiGetComments();
      this.comments = await this.mapApiResponseToStructure(response, 'comments');
    },

    async fetchSharedComments(filter: string) {
      const response = await strapiGetComments(filter);
      return this.mapApiResponseToStructure(response, 'comments');
    },

    async fetchMilestones(filter?: string) {
      const response = await strapiGetMilestones(filter);
      this.milestones = await this.mapApiResponseToStructure(response, 'milestones');
      return [...this.milestones];
    },

    async fetchMaterials() {
      const response = await strapiGetMaterials();
      this.materials = await this.mapApiResponseToStructure(response, 'materials');
    },

    setSelectedProjectId(projectId: number) {
      this.selectedProjectId = projectId;
    },

    async addProject(project: Project) {
      await strapiAddProject(project);
      this.projects?.push(project);
    },

    async addMilestone(milestone: Milestone) {
      await strapiAddMilestone(milestone);
      this.milestones.push(milestone);
    },

    async addMaterial(material: Material) {
      await strapiAddMaterials(material);
      this.materials.push(material);
    },

    async addComment(comment: Comment) {
      await strapiAddComment(comment);
      this.comments.push(comment);
    },

    async updateProjectStatus(projectId: number, status: ProjectStatus) {
      const project = this.projects.find(p => p.id === projectId);
      if (project) {
        project.status = status ?? ProjectStatus.NOT_STARTED;
        project.statusColor =
          status === ProjectStatus.COMPLETED
            ? ProgressColor.SUCCESS
            : status === ProjectStatus.IN_PROGRESS
            ? ProgressColor.WARNING
            : ProgressColor.DEFAULT;
      }
      await strapiUpdateProject(project);
    },

    async markMilestoneAsCompleted(milestoneId: number) {
      const milestoneIndex = this.milestones.findIndex(m => m.id === milestoneId);
      if (milestoneIndex !== -1) {
        this.milestones[milestoneIndex].status = MilestoneStatus.COMPLETED;
        this.milestones[milestoneIndex].statusColor = ProgressColor.SUCCESS;
      }

      await strapiUpdateMilestone(this.milestones[milestoneIndex]);
    },

    async shareProject(project: Project) {
      const projectToShare = this.projects.find(p => p.id === project.id);
      projectToShare.shared = true;
      await strapiUpdateProject(projectToShare);
      await strapiGetProjects();
    },

    async mapApiResponseToStructure(response: any, structure: string): Promise<any[]> {
      const responseData = response.value?.data;
      if (!responseData) return [];

      return responseData.map(({ id, attributes }) => {
        switch (structure) {
          case 'projects': {
            const { name, description, startDate, endDate, user, status, statusColor, image, shared } = attributes;
            const imageUrl = image.data?.attributes.url;
            return {
              id,
              name,
              description,
              startDate,
              endDate,
              user,
              status,
              statusColor,
              image: {
                url: imageUrl ? `https://pixeltronic.info/strapi/${imageUrl}` : null,
                alternativeText: image.data?.attributes.alternativeText ?? '',
                caption: image.data?.attributes.caption ?? '',
              },
              shared,
            };
          }
          case 'comments': {
            const { projectId, comments, commentedOn, commentedBy } = attributes;
            return {
              id,
              projectId,
              comments,
              commentedOn,
              commentedBy,
            };
          }
          case 'milestones': {
            const { projectId: milestoneProjectId, name, status, statusColor } = attributes;
            return {
              id,
              projectId: milestoneProjectId,
              name,
              status,
              statusColor,
            };
          }
          case 'materials': {
            const { projectId: materialProjectId, name, quantity, acquired } = attributes;
            return {
              projectId: materialProjectId,
              name,
              quantity,
              acquired,
            };
          }
          default:
            return {};
        }
      });
    },
  },
});
