export default interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  image?: ImageAttributes;
  comments?: number[];
}
interface ImageAttributes {
  url: string | null;
  alternativeText: string;
  caption: string;
}
