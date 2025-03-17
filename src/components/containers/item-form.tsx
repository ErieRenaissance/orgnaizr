{`'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PhotoUpload } from './photo-upload';
import { useContents } from '@/hooks/use-contents';
import { type Content } from '@/types/container';
import { itemSchema, type ItemFormData } from '@/lib/schemas/item-schema';
import {
  ITEM_CATEGORIES,
  ITEM_MATERIALS,
  ITEM_SIZES,
  ITEM_COLORS,
  ITEM_CONDITIONS,
  ITEM_FUNCTIONS,
} from '@/constants/item-types';

interface ItemFormProps {
  containerId: string;
  initialData?: Content;
  onSuccess: () => void;
}

export function ItemForm({ containerId, initialData, onSuccess }: ItemFormProps) {
  const { addContent, updateContent, loading } = useContents(containerId);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: initialData ? {
      name: initialData.item_name,
      quantity: 1,
      image: initialData.image_url || undefined,
      attributes: {
        category: initialData.category || 'Miscellaneous',
        material: initialData.material || 'Unknown',
        size: initialData.size || 'Medium',
        color: initialData.color || 'Black',
        secondaryColor: initialData.secondary_color || 'N/A',
        condition: initialData.condition || 'Good',
        function: initialData.function || 'Miscellaneous',
        fragile: initialData.fragile || false,
        brand: initialData.brand || '',
        model: initialData.model || '',
      }
    } : {
      quantity: 1,
      attributes: {
        category: 'Miscellaneous',
        material: 'Unknown',
        size: 'Medium',
        color: 'Black',
        secondaryColor: 'N/A',
        condition: 'Good',
        function: 'Miscellaneous',
        fragile: false,
      }
    }
  });

  const onSubmit = async (data: ItemFormData) => {
    const success = initialData
      ? await updateContent(initialData.id, data)
      : await addContent(data);

    if (success) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ... other form fields ... */}

      <div className="grid gap-4 md:grid-cols-3">
        {/* ... size and primary color fields ... */}

        <div>
          <Label>Secondary Color</Label>
          <Select 
            value={watch('attributes.secondaryColor')} 
            onValueChange={(v) => setValue('attributes.secondaryColor', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select secondary color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="N/A">N/A</SelectItem>
              {ITEM_COLORS.map((color) => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ... rest of the form ... */}
    </form>
  );
}`}