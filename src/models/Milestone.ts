export default interface Milestone {
  id?: number;
  projectId?: number;
  name?: string;
  description?: string;
  targetCompletionDate?: Date;
  status: Status;
  completedMilestones?: number[];
}

export enum Status {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Removed = 'Removed',
}

export enum ProgressColor {
  DANGER = 'danger',
  WARNING = 'warning',
  SUCCESS = 'success',
}
