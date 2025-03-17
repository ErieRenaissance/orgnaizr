'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhotoUpload } from './photo-upload';
import { LocationSelector } from '@/components/locations/location-selector';
import { CONTAINER_TYPES } from '@/types/container-types';
import { containerFormSchema, type ContainerFormData } from '@/lib/schemas/container-schema';
import { useNavigate } from 'react-router-dom';
import { useContainers } from '@/hooks/use-containers';

interface ContainerFormProps {
  onSuccess?: () => void;
}

export function ContainerForm({ onSuccess }: ContainerFormProps) {
  const navigate = useNavigate();
  const { createContainer, loading } = useContainers();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ContainerFormData>({
    resolver: zodResolver(containerFormSchema),
  });

  const locationId = watch('locationId');
  const photo = watch('photo');

  const onSubmit = async (data: ContainerFormData) => {
    if (await createContainer(data)) {
      onSuccess?.();
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <LocationSelector
          value={locationId || ''}
          onChange={(value) => setValue('locationId', value)}
        />
        {errors.locationId && (
          <p className="text-sm text-destructive">{errors.locationId.message}</p>
        )}
      </div>

      <div>
        <Select onValueChange={(value) => setValue('type', value)}>
          <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select container type" />
          </SelectTrigger>
          <SelectContent>
            {CONTAINER_TYPES.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-destructive mt-1">{errors.type.message}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Container Name"
          {...register('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Description (optional)"
          {...register('description')}
        />
      </div>

      <div>
        <PhotoUpload
          value={photo}
          onChange={(value) => setValue('photo', value)}
        />
        {errors.photo && (
          <p className="text-sm text-destructive mt-1">{errors.photo.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating...' : 'Create Container'}
      </Button>
    </form>
  );
}