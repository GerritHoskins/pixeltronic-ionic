export default interface SharedProject {
  id: number;
  projectId: number;
  sharedBy: string; // User ID or username
  sharedOn: Date;
  comments: Comment[];
}
