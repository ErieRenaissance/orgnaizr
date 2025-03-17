```tsx
'use client';

import { CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { type Content } from '@/types/container';

interface ContentCardHeaderProps {
  content: Content;
  onEdit: (content: Content) => void;
  onDelete: (id: string) => Promise<void>;
}

export function ContentCardHeader({ content, onEdit, onDelete }: ContentCardHeaderProps) {
  return (
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{content.item_name}</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(content)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(content.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
}
```