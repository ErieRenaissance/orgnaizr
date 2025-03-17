export const LOCATION_TYPES = [
  'Garage',
  'Attic',
  'Storage Unit',
  'Basement',
  'Closet',
  'Shed',
  'Other'
] as const;

export type LocationType = typeof LOCATION_TYPES[number];

export interface LocationFormData {
  name: string;
  description?: string;
  type: LocationType;
}