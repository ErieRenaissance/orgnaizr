```tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { type Content } from '@/types/container';

interface ContentAttributesBadgesProps {
  content: Content;
}

export function ContentAttributesBadges({ content }: ContentAttributesBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">{content.size}</Badge>
      <Badge>{content.color}</Badge>
      {content.secondary_color && content.secondary_color !== 'N/A' && (
        <Badge variant="outline">{content.secondary_color}</Badge>
      )}
      <Badge variant="outline">{content.condition}</Badge>
    </div>
  );
}
```