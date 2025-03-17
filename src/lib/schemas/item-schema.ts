import { z } from 'zod';
import {
  ITEM_CATEGORIES,
  ITEM_MATERIALS,
  ITEM_SIZES,
  ITEM_COLORS,
  ITEM_CONDITIONS,
  ITEM_FUNCTIONS,
} from '@/constants/item-types';

export const itemAttributesSchema = z.object({
  category: z.enum(ITEM_CATEGORIES, {
    required_error: 'Category is required',
  }),
  material: z.enum(ITEM_MATERIALS, {
    required_error: 'Material is required',
  }),
  size: z.enum(ITEM_SIZES, {
    required_error: 'Size is required',
  }),
  color: z.enum(ITEM_COLORS, {
    required_error: 'Color is required',
  }),
  secondaryColor: z.enum(ITEM_COLORS).optional(),
  condition: z.enum(ITEM_CONDITIONS, {
    required_error: 'Condition is required',
  }),
  function: z.enum(ITEM_FUNCTIONS, {
    required_error: 'Function is required',
  }),
  fragile: z.boolean(),
  brand: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
});

export const itemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  description: z.string().optional(),
  attributes: itemAttributesSchema,
  image: z.string().optional(),
});

export type ItemFormData = z.infer<typeof itemSchema>;