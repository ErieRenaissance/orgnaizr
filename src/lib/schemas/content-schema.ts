import { z } from 'zod';
import {
  ITEM_CATEGORIES,
  ITEM_MATERIALS,
  ITEM_SIZES,
  ITEM_COLORS,
  ITEM_CONDITIONS,
  ITEM_FUNCTIONS,
} from '@/constants/item-types';

export const contentFormSchema = z.object({
  itemName: z.string().min(1, 'Item name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
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
  fragile: z.boolean().default(false),
  brand: z.string().optional(),
  model: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type ContentFormData = z.infer<typeof contentFormSchema>;