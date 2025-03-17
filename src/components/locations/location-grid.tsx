'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLocations } from '@/hooks/use-locations';
import { Box, Pencil, Trash2 } from 'lucide-react';
import { ContainerCard } from '@/components/containers/container-card';
import { useContainers } from '@/hooks/use-containers';
import { LocationEditDialog } from './location-edit-dialog';
import { toast } from 'sonner';

export function LocationGrid() {
  const { locations, loading, deleteLocation } = useLocations();
  const { containers } = useContainers();
  const [search, setSearch] = useState('');
  const [editingLocation, setEditingLocation] = useState<string | null>(null);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(search.toLowerCase()) ||
    location.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (locationId: string) => {
    const locationContainers = containers.filter(c => c.location_id === locationId);
    if (locationContainers.length > 0) {
      toast.error('Cannot delete location with containers. Please move or delete containers first.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this location?')) {
      await deleteLocation(locationId);
    }
  };

  if (loading) {
    return <div>Loading locations...</div>;
  }

  return (
    <div className="space-y-6">
      <Input
        type="search"
        placeholder="Search locations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-8">
        {filteredLocations.map((location) => {
          const locationContainers = containers.filter(c => c.location_id === location.id);
          
          return (
            <div key={location.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Box className="h-5 w-5" />
                  {location.name}
                  <span className="text-sm text-muted-foreground">
                    ({locationContainers.length} containers)
                  </span>
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setEditingLocation(location.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDelete(location.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {locationContainers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {locationContainers.map((container) => (
                    <ContainerCard
                      key={container.id}
                      container={container}
                      onDelete={() => {}}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No containers in this location
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>

      {editingLocation && (
        <LocationEditDialog
          locationId={editingLocation}
          open={true}
          onOpenChange={(open) => !open && setEditingLocation(null)}
        />
      )}
    </div>
  );
}