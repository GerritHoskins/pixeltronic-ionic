import { defineStore } from 'pinia';
import { Milestone, Project, Material, Comment, State } from '@/models';
import { useStorage } from '@vueuse/core';
import { strapiAddComment, strapiAddProject, strapiGetProjects } from '@/api/strapi';

export const useProjectsStore = defineStore('projects', {
  state: (): State => ({
    selectedProjectId: undefined,
    projects: useStorage<Project[]>('projects', []),
    milestones: useStorage<Milestone[]>('milestones', []),
    materials: useStorage<Material[]>('materials', []),
    sharedProjects: useStorage<Project[]>('sharedProjects', []),
    comments: useStorage<Comment[]>('comments', []),
  }),

  getters: {
    getMilestonesByProjectId: state => (projectId: number) => {
      return state.milestones.filter(m => m.projectId === projectId);
    },

    getCommentsByProjectId: state => (projectId: number) => {
      return state.comments.filter(c => c.projectId === projectId);
    },

    getProjectById: state => (projectId: number) => {
      return state.projects.find(p => p.id === projectId);
    },
  },

  actions: {
    async fetchProjects() {
      const response = await strapiGetProjects();
      const projects = response.data?.data;
      projects.map(({ id, attributes }) => {
        const { name, description, startDate, endDate, image } = attributes;
        const imageUrl = image.data?.attributes.url;
        this.projects.push({
          id,
          name,
          description,
          startDate,
          endDate,
          image: {
            url: imageUrl ? `https://pixeltronic.info/strapi/${imageUrl}` : null,
            alternativeText: image.data?.attributes.alternativeText ?? '',
            caption: image.data?.attributes.caption ?? '',
          },
        });
      });
      this.saveState();
    },

    setSelectedProjectId(projectId: number) {
      this.selectedProjectId = projectId;
    },

    async addProject(project: Project) {
      await strapiAddProject(project);
      this.projects?.push(project);
      this.saveState();
    },

    addMilestone(milestone: Milestone) {
      this.milestones.push(milestone);
      this.saveState();
    },

    addMaterial(material: Material) {
      this.materials.push(material);
      this.saveState();
    },

    async addComment(comment: Comment) {
      this.comments.push(comment);
      await strapiAddComment(comment);
      this.saveState();
    },

    saveState() {
      localStorage.setItem('projects', JSON.stringify(this.projects));
      localStorage.setItem('milestones', JSON.stringify(this.milestones));
      localStorage.setItem('materials', JSON.stringify(this.materials));
      localStorage.setItem('sharedProjects', JSON.stringify(this.sharedProjects));
      localStorage.setItem('comments', JSON.stringify(this.comments));
    },

    updateProjectStatus(projectId: number, status: 'Not Started' | 'In Progress' | 'Completed') {
      const project = this.projects.find(p => p.id === projectId);
      if (project) project.status = status;
    },

    markMilestoneAsCompleted(milestoneId: number) {
      const milestoneIndex = this.milestones.findIndex(m => m.id === milestoneId);
      if (milestoneIndex !== -1) {
        this.milestones[milestoneIndex].completed = true;
      }
    },

    shareProject(project: Project) {
      this.sharedProjects.push(project);
    },
  },
});
