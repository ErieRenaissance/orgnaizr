import { ContainerGrid } from '@/components/containers/container-grid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { LocationFormDialog } from '@/components/locations/location-form-dialog';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Containers</h1>
        <div className="flex space-x-4">
          <Button asChild variant="outline">
            <Link href="/locations/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Link>
          </Button>
          <Button asChild>
            <Link href="/containers/new">
              <Plus className="mr-2 h-4 w-4" />
              New Container
            </Link>
          </Button>
        </div>
      </div>

      <ContainerGrid />
    </div>
  );
}