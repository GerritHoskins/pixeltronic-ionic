export default interface Milestone {
  id: number;
  projectId: number;
  name: string;
  description: string;
  targetCompletionDate: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
  completedMilestones: number[]; // Array of completed milestone IDs
}
