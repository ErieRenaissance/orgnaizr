import { z } from 'zod';

export const addressSchema = z.object({
  street: z.string().min(1, 'Street address is required'),
  unit: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
});

export const addressFormSchema = addressSchema.extend({
  label: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressFormSchema>;