import { z } from 'zod';
import { CONTAINER_TYPES } from '@/types/container-types';

export const containerFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  type: z.enum(CONTAINER_TYPES, {
    required_error: 'Container type is required',
  }),
  locationId: z.string().min(1, 'Storage location is required'),
  photo: z.string().min(1, 'Container photo is required'),
});

export type ContainerFormData = z.infer<typeof containerFormSchema>;