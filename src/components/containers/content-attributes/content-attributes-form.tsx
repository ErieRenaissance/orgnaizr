```tsx
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ITEM_COLORS } from '@/constants/item-types';
import { type Content } from '@/types/container';
import { supabase } from '@/lib/supabase';

interface ContentAttributesFormProps {
  content: Content;
  onUpdate?: () => void;
}

export function ContentAttributesForm({ content, onUpdate }: ContentAttributesFormProps) {
  const [attributes, setAttributes] = useState({
    category: content.category,
    material: content.material,
    size: content.size,
    color: content.color,
    secondaryColor: content.secondary_color || 'N/A',
    condition: content.condition,
    function: content.function,
    fragile: content.fragile,
  });

  const handleAttributeChange = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('contents')
        .update({ [key]: value })
        .eq('id', content.id);

      if (error) throw error;
      
      setAttributes(prev => ({ ...prev, [key]: value }));
      onUpdate?.();
    } catch (error) {
      console.error('Failed to update attribute:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Color</Label>
          <Select 
            value={attributes.color} 
            onValueChange={(v) => handleAttributeChange('color', v)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ITEM_COLORS.map((color) => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Secondary Color</Label>
          <Select 
            value={attributes.secondaryColor} 
            onValueChange={(v) => handleAttributeChange('secondary_color', v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select secondary color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="N/A">N/A</SelectItem>
              {ITEM_COLORS.map((color) => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge>{attributes.category}</Badge>
        <Badge variant="secondary">{attributes.material}</Badge>
        <Badge>{attributes.size}</Badge>
        <Badge>{attributes.color}</Badge>
        {attributes.secondaryColor !== 'N/A' && (
          <Badge variant="outline">Secondary: {attributes.secondaryColor}</Badge>
        )}
        <Badge variant="outline">{attributes.condition}</Badge>
        <Badge>{attributes.function}</Badge>
        {attributes.fragile && <Badge variant="destructive">Fragile</Badge>}
      </div>
    </div>
  );
}
```