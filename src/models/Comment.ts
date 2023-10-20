export default interface Comment {
  projectId: number;
  sharedProjectId: number;
  comment: string;
  commentedBy: string;
  commentedOn: Date;
}
