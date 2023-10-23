import { ProgressColor } from '@/models/ProgressColor';

export default interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  user?: string;
  image?: ImageAttributes;
  status?: ProjectStatus;
  statusColor?: ProgressColor;
  comments?: number[];
  shared?: boolean;
}

interface ImageAttributes {
  url: string | null;
  alternativeText: string;
  caption: string;
}

export enum ProjectStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}
