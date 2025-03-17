'use client';

import { LocationForm } from '@/components/locations/location-form';

export default function NewLocationPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Add Storage Location</h1>
      <div className="max-w-xl">
        <LocationForm />
      </div>
    </div>
  );
}