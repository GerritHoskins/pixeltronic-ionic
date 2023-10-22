import { defineStore } from 'pinia';
import { Milestone, Project, Material, Comment, State } from '@/models';
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
import { Status } from '@/models/Milestone';
import { Status } from '@/models/Project';

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

    getSharedProjects: state => () => {
      return state.projects.filter(p => p.shared);
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

    async updateProjectStatus(projectId: number, status: Status) {
      const project = this.projects.find(p => p.id === projectId);
      if (project) project.status = status;
      await strapiUpdateProject(project);
    },

    async markMilestoneAsCompleted(milestoneId: number) {
      const milestoneIndex = this.milestones.findIndex(m => m.id === milestoneId);
      if (milestoneIndex !== -1) {
        this.milestones[milestoneIndex].status = Status.Completed;
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
            const { name, description, startDate, endDate, status, image, shared } = attributes;
            const imageUrl = image.data?.attributes.url;
            return {
              id,
              name,
              description,
              startDate,
              endDate,
              status,
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
            const { projectId: milestoneProjectId, name, status } = attributes;
            return {
              id,
              projectId: milestoneProjectId,
              name,
              status,
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
