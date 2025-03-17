import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContentList } from './content-list';
import { type Content } from '@/types/container';

type GroupByAttribute = 'category' | 'material' | 'size' | 'color' | 'condition' | 'function' | 'fragile' | 'none';

interface ContentViewProps {
  contents: Content[];
  onEdit: (content: Content) => void;
  onDelete: (id: string) => Promise<void>;
}

export function ContentView({ contents, onEdit, onDelete }: ContentViewProps) {
  const [groupBy, setGroupBy] = useState<GroupByAttribute>('none');

  const groupedContents = groupContents(contents, groupBy);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Group by:</span>
        <Select value={groupBy} onValueChange={(value) => setGroupBy(value as GroupByAttribute)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select grouping" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Grouping</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="material">Material</SelectItem>
            <SelectItem value="size">Size</SelectItem>
            <SelectItem value="color">Color</SelectItem>
            <SelectItem value="condition">Condition</SelectItem>
            <SelectItem value="function">Function</SelectItem>
            <SelectItem value="fragile">Fragile</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {groupBy === 'none' ? (
        <ContentList
          contents={contents}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedContents).map(([group, items]) => (
            <div key={group} className="space-y-4">
              <h3 className="text-lg font-semibold">{formatGroupTitle(group, groupBy)}</h3>
              <ContentList
                contents={items}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function groupContents(contents: Content[], groupBy: GroupByAttribute) {
  if (groupBy === 'none') return { ungrouped: contents };

  return contents.reduce((groups, content) => {
    const key = groupBy === 'fragile' 
      ? content.fragile ? 'Yes' : 'No'
      : content[groupBy]?.toString() || 'Unknown';
    
    return {
      ...groups,
      [key]: [...(groups[key] || []), content],
    };
  }, {} as Record<string, Content[]>);
}

function formatGroupTitle(group: string, groupBy: GroupByAttribute): string {
  if (groupBy === 'fragile') {
    return `Fragile: ${group}`;
  }
  return group;
}