'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { ContainerCard } from '@/components/containers/container-card';
import { LocationEditDialog } from '@/components/locations/location-edit-dialog';
import { useLocations } from '@/hooks/use-locations';
import { useContainers } from '@/hooks/use-containers';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LocationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { locations, deleteLocation } = useLocations();
  const { containers } = useContainers();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const location = locations.find(l => l.id === params.id);
  const locationContainers = containers.filter(c => c.location_id === params.id);

  const handleDelete = async () => {
    if (locationContainers.length > 0) {
      toast.error('Cannot delete location with containers. Please move or delete containers first.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this location?')) {
      const success = await deleteLocation(params.id);
      if (success) {
        router.push('/locations');
      }
    }
  };

  if (!location) {
    return <div>Location not found</div>;
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{location.name}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowEditDialog(true)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardContent className="pt-6">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                <dd className="text-lg">{location.type}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Containers</dt>
                <dd className="text-lg">{locationContainers.length}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locationContainers.map((container) => (
            <ContainerCard
              key={container.id}
              container={container}
              onDelete={() => {}}
            />
          ))}
        </div>
      </div>

      <LocationEditDialog
        locationId={params.id}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </div>
  );
}