'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { LocationGrid } from '@/components/locations/location-grid';
import { LocationFormDialog } from '@/components/locations/location-form-dialog';

export default function LocationsPage() {
  const [showLocationForm, setShowLocationForm] = useState(false);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Storage Locations</h1>
        <Button onClick={() => setShowLocationForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      <LocationGrid />

      <LocationFormDialog 
        open={showLocationForm} 
        onOpenChange={setShowLocationForm}
      />
    </div>
  );
}