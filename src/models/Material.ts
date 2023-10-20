export default interface Material {
  id: number;
  projectId: number;
  name: string;
  quantity: number; // Quantity required for the project
  acquired: number; // Quantity already acquired or bought
}
