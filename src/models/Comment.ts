export default interface Comment {
  projectId: number;
  comment: string;
  commentedBy: string;
  commentedOn?: Date;
}
