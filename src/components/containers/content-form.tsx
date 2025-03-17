'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/auth';
import { toast } from 'sonner';
import {
  ITEM_CATEGORIES,
  ITEM_MATERIALS,
  ITEM_SIZES,
  ITEM_COLORS,
  ITEM_CONDITIONS,
  ITEM_FUNCTIONS,
} from '@/types/item-types';

const schema = z.object({
  itemName: z.string().min(1, 'Item name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  category: z.string().min(1, 'Category is required'),
  material: z.string().min(1, 'Material is required'),
  size: z.string().min(1, 'Size is required'),
  color: z.string().min(1, 'Color is required'),
  condition: z.string().min(1, 'Condition is required'),
  function: z.string().min(1, 'Function is required'),
  fragile: z.boolean().default(false),
  brand: z.string().optional(),
  model: z.string().optional(),
  imageUrl: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ContentFormProps {
  containerId: string;
  onSuccess: () => void;
}

export function ContentForm({ containerId, onSuccess }: ContentFormProps) {
  const supabase = createClient();
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: 1,
      fragile: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('contents')
        .insert([{
          container_id: containerId,
          item_name: data.itemName,
          quantity: data.quantity,
          category: data.category,
          material: data.material,
          size: data.size,
          color: data.color,
          condition: data.condition,
          function: data.function,
          fragile: data.fragile,
          brand: data.brand,
          model: data.model,
          image_url: data.imageUrl,
        }]);
      
      if (error) throw error;
      
      toast.success('Item added successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Input
            placeholder="Item Name"
            {...register('itemName')}
            className={errors.itemName ? 'border-destructive' : ''}
          />
          {errors.itemName && (
            <p className="text-sm text-destructive mt-1">{errors.itemName.message}</p>
          )}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Quantity"
            {...register('quantity', { valueAsNumber: true })}
            className={errors.quantity ? 'border-destructive' : ''}
          />
          {errors.quantity && (
            <p className="text-sm text-destructive mt-1">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select onValueChange={(value) => setValue('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {ITEM_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setValue('material', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select material" />
          </SelectTrigger>
          <SelectContent>
            {ITEM_MATERIALS.map((material) => (
              <SelectItem key={material} value={material}>{material}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Select onValueChange={(value) => setValue('size', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {ITEM_SIZES.map((size) => (
              <SelectItem key={size} value={size}>{size}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setValue('color', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            {ITEM_COLORS.map((color) => (
              <SelectItem key={color} value={color}>{color}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setValue('condition', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            {ITEM_CONDITIONS.map((condition) => (
              <SelectItem key={condition} value={condition}>{condition}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select onValueChange={(value) => setValue('function', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select function" />
          </SelectTrigger>
          <SelectContent>
            {ITEM_FUNCTIONS.map((func) => (
              <SelectItem key={func} value={func}>{func}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Switch
            id="fragile"
            onCheckedChange={(checked) => setValue('fragile', checked)}
          />
          <Label htmlFor="fragile">Fragile Item</Label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Brand (optional)"
          {...register('brand')}
        />
        <Input
          placeholder="Model (optional)"
          {...register('model')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Adding...' : 'Add Item'}
      </Button>
    </form>
  );
}