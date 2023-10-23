import { ProgressColor } from '@/models/ProgressColor';

export default interface Milestone {
  id?: number;
  projectId?: number;
  name?: string;
  description?: string;
  targetCompletionDate?: Date;
  status: MilestoneStatus;
  statusColor?: ProgressColor;
  completedMilestones?: number[];
}

export enum MilestoneStatus {
  COMPLETED = 'Completed',
  IN_PROGRESS = 'In Progress',
  NOT_STARTED = 'Not Started',
}
