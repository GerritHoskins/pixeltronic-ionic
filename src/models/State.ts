import { Comment, Material, Milestone, Project, SharedProject } from '@/models/index';

export default interface State {
  selectedProjectId?: number;
  projects: Project[];
  milestones: Milestone[];
  materials: Material[];
  sharedProjects: SharedProject[];
  comments: Comment[];
}
