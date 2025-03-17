```tsx
'use client';

import { ContentCardHeader } from './content-card-header';
import { ContentCardImage } from './content-card-image';
import { ContentCardAttributes } from './content-card-attributes';
import { Card, CardContent } from '@/components/ui/card';
import { type Content } from '@/types/container';

interface ContentCardProps {
  content: Content;
  onEdit: (content: Content) => void;
  onDelete: (id: string) => Promise<void>;
  onUpdate?: () => void;
}

export function ContentCard({ content, onEdit, onDelete, onUpdate }: ContentCardProps) {
  return (
    <Card className="group relative">
      <ContentCardHeader 
        content={content}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <CardContent className="space-y-4">
        <ContentCardImage 
          imageUrl={content.image_url}
          altText={content.item_name}
        />
        <ContentCardAttributes 
          content={content}
          onUpdate={onUpdate}
        />
      </CardContent>
    </Card>
  );
}

export * from './content-card-header';
export * from './content-card-image';
export * from './content-card-attributes';
```