'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Warehouse,
  Home,
  Car, // Changed from Garage
  Box,
  Archive,
  Building2
} from 'lucide-react';

const locations = [
  { name: 'Garage', icon: Car, description: 'Tools, seasonal items, and equipment' }, // Updated icon
  { name: 'Attic', icon: Home, description: 'Holiday decorations and keepsakes' },
  { name: 'Storage Unit', icon: Warehouse, description: 'Long-term storage and valuables' },
  { name: 'Basement', icon: Building2, description: 'Emergency supplies and preserved items' },
  { name: 'Closets', icon: Archive, description: 'Clothing and everyday essentials' },
  { name: 'Shed', icon: Box, description: 'Garden tools and outdoor equipment' },
];

export function LocationGrid() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Storage Locations</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <Card key={location.name} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <location.icon className="h-5 w-5" />
                {location.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{location.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}