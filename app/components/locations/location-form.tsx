'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClient } from '@/lib/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LOCATION_TYPES = [
  'Garage',
  'Attic',
  'Storage Unit',
  'Basement',
  'Closet',
  'Shed',
  'Other'
] as const;

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(LOCATION_TYPES, {
    required_error: 'Location type is required',
  }),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function LocationForm() {
  const router = useRouter();
  const supabase = createClient();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('storage_locations')
        .insert([data]);
      
      if (error) throw error;
      
      toast.success('Location created');
      router.push('/locations');
    } catch (error) {
      toast.error('Failed to create location');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Location Name"
          {...register('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Select onValueChange={(value) => setValue('type', value as typeof LOCATION_TYPES[number])}>
          <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select location type" />
          </SelectTrigger>
          <SelectContent>
            {LOCATION_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-destructive mt-1">{errors.type.message}</p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Description (optional)"
          {...register('description')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Location'}
      </Button>
    </form>
  );
}