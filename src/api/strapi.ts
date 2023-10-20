import axios from 'axios';
import { Project } from '@/models';
const BASE_URL = 'https://pixeltronic.info/strapi';

export const strapiAddProject = async (project: Project) => {
  const data = {
    data: project,
  };
  try {
    await axios.post(`${BASE_URL}/api/projects`, data);
  } catch (e) {
    console.error(e);
  }
};

export const strapiGetProjects = async () => {
  try {
    return await axios.get(`${BASE_URL}/api/projects?populate=*`);
  } catch (e) {
    console.error(e);
  }
};

export const strapiUpdateProject = async (project: Project) => {
  const data = {
    data: project,
  };
  try {
    await axios.put(`${BASE_URL}/api/projects`, data);
  } catch (e) {
    console.error(e);
  }
};

export const strapiAddComment = async (comment: Comment) => {
  const data = {
    data: comment,
  };
  try {
    await axios.post(`${BASE_URL}/api/comments`, data);
  } catch (e) {
    console.error(e);
  }
};
