export default interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  image?: string;
}
