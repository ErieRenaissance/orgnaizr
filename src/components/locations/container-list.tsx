'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { type Container } from '@/types/container';
import { cn } from '@/lib/utils';

interface ContainerListProps {
  containers: Container[];
  selectedContainers: string[];
  onSelectionChange: (selected: string[]) => void;
  locationId: string;
}

export function ContainerList({
  containers,
  selectedContainers,
  onSelectionChange,
  locationId,
}: ContainerListProps) {
  const [search, setSearch] = useState('');

  const filteredContainers = containers.filter(container =>
    container.name.toLowerCase().includes(search.toLowerCase()) ||
    container.description?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleContainer = (containerId: string) => {
    const newSelected = selectedContainers.includes(containerId)
      ? selectedContainers.filter(id => id !== containerId)
      : [...selectedContainers, containerId];
    onSelectionChange(newSelected);
  };

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search containers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
        {filteredContainers.map((container) => {
          const isSelected = selectedContainers.includes(container.id);
          const hasNoLocation = !container.location_id;

          return (
            <Card
              key={container.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md relative",
                isSelected && "ring-2 ring-primary"
              )}
              onClick={() => toggleContainer(container.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="font-medium">{container.name}</div>
                  {container.description && (
                    <div className="text-muted-foreground text-sm">
                      {container.description}
                    </div>
                  )}
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                )}
                {hasNoLocation && (
                  <div className="absolute top-2 right-2 text-warning">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {filteredContainers.length === 0 && (
          <div className="col-span-2 text-center py-4 text-muted-foreground">
            No containers found
          </div>
        )}
      </div>
    </div>
  );
}