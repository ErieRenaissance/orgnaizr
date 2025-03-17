import { z } from 'zod';
import { LOCATION_TYPES } from '@/types/location-types';
import { addressSchema } from './address-schema';

export const locationFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  type: z.enum(LOCATION_TYPES, {
    required_error: 'Location type is required',
  }),
  address: addressSchema,
});

export type LocationFormData = z.infer<typeof locationFormSchema>;