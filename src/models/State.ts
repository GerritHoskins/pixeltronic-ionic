import { Comment, Material, Milestone, Project } from '@/models/index';

export default interface State {
  initialized: boolean;
  selectedProjectId?: number;
  project: Project[];
  milestone: Milestone[];
  material: Material[];
  comment: Comment[];
}
