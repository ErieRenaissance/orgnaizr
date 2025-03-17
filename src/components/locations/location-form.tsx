import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddressForm } from './address-form';
import { LOCATION_TYPES } from '@/types/location-types';
import { locationFormSchema, type LocationFormData } from '@/lib/schemas/location-schema';
import { useLocations } from '@/hooks/use-locations';

interface LocationFormProps {
  onSuccess?: () => void;
}

export function LocationForm({ onSuccess }: LocationFormProps) {
  const { createLocation, loading } = useLocations();
  const methods = useForm<LocationFormData>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      address: {
        country: 'United States' // Default country
      }
    }
  });

  const { register, handleSubmit, setValue, formState: { errors } } = methods;

  const onSubmit = async (data: LocationFormData) => {
    if (await createLocation(data)) {
      onSuccess?.();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Select onValueChange={(value) => setValue('type', value)}>
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
            <Textarea
              placeholder="Description (optional)"
              {...register('description')}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Address Information</h3>
          <AddressForm />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create Location'}
        </Button>
      </form>
    </FormProvider>
  );
}