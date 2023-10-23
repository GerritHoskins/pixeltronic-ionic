import axios from 'axios';
import { Material, Milestone, Project } from '@/models';
import { useAxios } from '@vueuse/integrations/useAxios';
import User from '@/models/User';

export const BASE_URL = 'https://pixeltronic.info';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const setRequestInterceptor = (jwt: string) => {
  instance.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${jwt}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
};

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
  executeRequest(filter ? `/comments?${filter}&populate=*` : '/comments?populate=*', 'GET');
export const strapiAddComment = async (comment: Comment) => executeRequest('/comments', 'POST', comment);

export const strapiGetMilestones = (filter?: string) =>
  executeRequest(filter ? `/milestones?${filter}&populate=*` : '/milestones?&populate=*', 'GET');
export const strapiAddMilestone = (milestone: Milestone) => executeRequest('/milestones', 'POST', milestone);
export const strapiUpdateMilestone = (milestone: Milestone) =>
  executeRequest(`/milestones/${milestone.id}`, 'PUT', milestone);

export const strapiGetMaterials = () => executeRequest('/materials', 'GET');
export const strapiAddMaterials = (material: Material) => executeRequest('/materials', 'POST', material);

export const strapiAuthRegister = async (userData: User) => {
  return useAxios('https://pixeltronic.info/strapi/api/auth/local/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      username: userData.user.username,
      email: userData.user.email,
      password: userData.user.password,
    },
  });
};

export const strapiAuthLogin = async (userData: User) => {
  return useAxios('https://pixeltronic.info/strapi/api/auth/local', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      identifier: userData.user.email,
      password: userData.user.password,
    },
  });
};

export const strapiUploadImage = async (formData: FormData) => {
  try {
    const response = await axios.post('https://pixeltronic.info/strapi/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data && response.status === 200) {
      return response.data[0];
    }
  } catch (error) {
    console.error('Error uploading the file:', error);
  }
};
