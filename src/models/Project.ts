export default interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  image?: ImageAttributes;
  status?: Status;
  comments?: number[];
  shared?: boolean;
}

interface ImageAttributes {
  url: string | null;
  alternativeText: string;
  caption: string;
}

export enum Status {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
}
