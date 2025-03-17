```tsx
'use client';

import { ContentAttributesBadges } from './content-attributes-badges';
import { ContentAttributesForm } from './content-attributes-form';
import { type Content } from '@/types/container';

interface ContentAttributesProps {
  content: Content;
  compact?: boolean;
  onUpdate?: () => void;
}

export function ContentAttributes({ content, compact = false, onUpdate }: ContentAttributesProps) {
  if (compact) {
    return <ContentAttributesBadges content={content} />;
  }

  return <ContentAttributesForm content={content} onUpdate={onUpdate} />;
}

export * from './content-attributes-badges';
export * from './content-attributes-form';
```