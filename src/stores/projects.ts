import { defineStore } from 'pinia';
import { Milestone, Project, Material, Comment, SharedProject } from '@/models';
import { useStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', {
  state: () => {
    return {
      selectedProjectId: undefined,
      projects: useStorage<Project[]>('projects', []),
      milestones: useStorage<Milestone[]>('milestones', []),
      materials: useStorage<Material[]>('materials', []),
      sharedProjects: useStorage<SharedProject[]>('sharedProjects', []),
      comments: useStorage<Comment[]>('comments', []),
    };
  },

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
    setSelectedProjectId(projectId: number) {
      this.selectedProjectId = projectId;
    },

    addProject(project: Project) {
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

    addComment(comment: Comment) {
      //const sharedProject = this.sharedProjects.find(sp => sp.projectId === projectId);
      //  if (sharedProject) {
      this.comments.push(comment);
      //   }
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

    shareProject(projectId: number, userId: string) {
      const sharedProject: SharedProject = {
        id: Date.now(),
        projectId: projectId,
        sharedBy: userId,
        sharedOn: new Date(),
        comments: [],
      };
      this.sharedProjects.push(sharedProject);
    },
  },
});
