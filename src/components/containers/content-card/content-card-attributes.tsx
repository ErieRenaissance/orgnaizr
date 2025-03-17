```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ContentAttributes } from '../content-attributes';
import { type Content } from '@/types/container';

interface ContentCardAttributesProps {
  content: Content;
  onUpdate?: () => void;
}

export function ContentCardAttributes({ content, onUpdate }: ContentCardAttributesProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4">
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
    </div>
  );
}
```