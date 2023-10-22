import { Comment, Material, Milestone, Project } from '@/models/index';

export default interface State {
  initialized: boolean;
  selectedProjectId?: number;
  projects: Project[];
  milestones: Milestone[];
  materials: Material[];
  comments: Comment[];
}
