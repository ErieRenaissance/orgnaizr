```tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ContentCard } from '@/components/containers/content-card';
import { type Content } from '@/types/container';

interface ContentListProps {
  contents: Content[];
  onEdit: (content: Content) => void;
  onDelete: (id: string) => Promise<void>;
}

export function ContentList({ contents, onEdit, onDelete }: ContentListProps) {
  const [search, setSearch] = useState('');

  // Don't group items - treat each as individual even if names match
  const filteredContents = contents.filter(content =>
    content.item_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search contents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredContents.map((content) => (
          <ContentCard
            key={content.id} // Use unique ID instead of name
            content={content}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {filteredContents.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No items found
          </div>
        )}
      </div>
    </div>
  );
}
```