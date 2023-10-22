import axios from 'axios';
import { Material, Milestone, Project } from '@/models';
import { useAxios } from '@vueuse/integrations/useAxios';
import User from '@/models/User';

const instance = axios.create({
  baseURL: 'https://pixeltronic.info',
});

const executeRequest = async (endpoint: string, method: 'GET' | 'POST' | 'PUT', data?: any) => {
  const options = { method, data: { data } };

  try {
    const { data: responseData } = await useAxios(`/strapi/api${endpoint}`, options, instance);
    return responseData;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const strapiAddProject = (project: Project) => executeRequest('/projects', 'POST', project);
export const strapiGetProjects = (filter?: string) =>
  executeRequest(filter ? `/projects?${filter}&populate=*` : '/projects?&populate=*', 'GET');
export const strapiUpdateProject = (project: Project) => executeRequest(`/projects/${project.id}`, 'PUT', project);

export const strapiGetComments = async (filter?: string) =>
  executeRequest(filter ? `/comments?${filter}&populate=*` : '/comments?populate=*');
export const strapiAddComment = async (comment: Comment) => executeRequest('/comments', 'POST', comment);

export const strapiGetMilestones = (filter?: string) =>
  executeRequest(filter ? `/milestones?${filter}&populate=*` : '/milestones?&populate=*', 'GET');
export const strapiAddMilestone = (milestone: Milestone) => executeRequest('/milestones', 'POST', milestone);
export const strapiUpdateMilestone = (milestone: Milestone) =>
  executeRequest(`/milestones/${milestone.id}`, 'PUT', milestone);

export const strapiGetMaterials = () => executeRequest('/materials', 'GET');
export const strapiAddMaterials = (material: Material) => executeRequest('/materials', 'POST', material);

export const strapiAuthRegister = async (user: User) => {
  return useAxios('https://pixeltronic.info/strapi/api/auth/local/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
  });
};

export const strapiAuthLogin = async (userData: User) => {
  return useAxios('https://pixeltronic.info/strapi/api/auth/local', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      identifier: userData.email,
      password: userData.password,
    },
  });
};
