import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocations } from '@/hooks/use-locations';
import { useContainers } from '@/hooks/use-containers';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContainerList } from './container-list';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
});

const locationTypes = [
  'Garage',
  'Attic',
  'Storage Unit',
  'Basement',
  'Closet',
  'Shed',
  'Other'
];

interface LocationEditDialogProps {
  locationId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LocationEditDialog({ locationId, open, onOpenChange }: LocationEditDialogProps) {
  const { locations, updateLocation } = useLocations();
  const { containers, updateContainer } = useContainers();
  const [selectedContainers, setSelectedContainers] = useState<string[]>([]);
  
  const location = locations.find(l => l.id === locationId);
  const locationContainers = containers.filter(c => c.location_id === locationId);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: location?.name || '',
      type: location?.type || '',
    },
  });

  useEffect(() => {
    if (location) {
      reset({
        name: location.name,
        type: location.type,
      });
      setSelectedContainers(locationContainers.map(c => c.id));
    }
  }, [location, locationContainers, reset]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    if (!location) return;

    try {
      // Update location details
      await updateLocation(locationId, data);

      // Update container assignments
      const updates = containers.map(container => {
        const shouldBeInLocation = selectedContainers.includes(container.id);
        const isInLocation = container.location_id === locationId;

        if (shouldBeInLocation !== isInLocation) {
          return updateContainer(container.id, {
            location_id: shouldBeInLocation ? locationId : null,
          });
        }
        return Promise.resolve();
      });

      await Promise.all(updates);
      
      toast.success('Location updated successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to update location');
    }
  };

  if (!location) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Location: {location.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
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
              <Select
                defaultValue={location.type}
                onValueChange={(value) => setValue('type', value)}
              >
                <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  {locationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-destructive mt-1">{errors.type.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Manage Containers</h3>
            <ContainerList
              containers={containers}
              selectedContainers={selectedContainers}
              onSelectionChange={setSelectedContainers}
              locationId={locationId}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}