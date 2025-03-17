import { z } from 'zod';

export const containerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

export const contentSchema = z.object({
  itemName: z.string().min(1, 'Item name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  imageUrl: z.string().optional(),
  confidenceScore: z.number().optional(),
});