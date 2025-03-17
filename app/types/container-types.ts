export const CONTAINER_TYPES = [
  'Cardboard Box',
  'Plastic Tote',
  'Storage Bin',
  'Luggage',
  'Moving Box',
  'Vacuum Bag',
  'Garment Box',
  'File Box',
  'Storage Trunk',
  'Plastic Container',
  'Crate',
  'Other'
] as const;

export type ContainerType = typeof CONTAINER_TYPES[number];

export interface ContainerFormData {
  name: string;
  description?: string;
  type: ContainerType;
  locationId: string;
  photo?: string;
}