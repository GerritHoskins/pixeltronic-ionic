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

export const useProjectsStore = defineStore('project', {
  state: (): State => ({
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
    async fetchDataAndMap(apiMethod: any, mapperKey: string) {
      const { mapper } = useApiResponseMapper();
      const response = await apiMethod();
      return await mapper(response, mapperKey);
    },

    async fetchProjects() {
      this.project = await this.fetchDataAndMap(strapiGetProjects, 'project');
    },

    async fetchSharedProjects(filter: string) {
      return this.fetchDataAndMap(() => strapiGetProjects(filter), 'project');
    },

    async fetchMaterials() {
      this.material = await this.fetchDataAndMap(strapiGetMaterials, 'material');
    },

    setSelectedProjectId(projectId: number) {
      this.selectedProjectId = projectId;
    },

    async addProject(formData: FormData, project: Project) {
      await strapiAddProject(formData);
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
