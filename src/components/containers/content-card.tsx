```tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { ContentAttributes } from './content-attributes';
import { type Content } from '@/types/container';

interface ContentCardProps {
  content: Content;
  onEdit: (content: Content) => void;
  onDelete: (id: string) => Promise<void>;
  onUpdate?: () => void;
}

export function ContentCard({ content, onEdit, onDelete, onUpdate }: ContentCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="group relative">
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
      <CardContent className="space-y-4">
        {content.image_url && (
          <div className="relative h-32 w-full">
            <img
              src={content.image_url}
              alt={content.item_name}
              className="rounded object-cover w-full h-full"
            />
          </div>
        )}
        
        <ContentAttributes 
          content={content}
          onUpdate={onUpdate}
          compact={!expanded}
        />
        
        {!expanded && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-2"
            onClick={() => setExpanded(true)}
          >
            Show More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
```