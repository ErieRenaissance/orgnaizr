import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type Content } from '@/types/container';

interface ContentAttributeCardProps {
  content: Content;
}

export function ContentAttributeCard({ content }: ContentAttributeCardProps) {
  const attributes = [
    { label: 'Category', value: content.category },
    { label: 'Material', value: content.material },
    { label: 'Size', value: content.size },
    { label: 'Color', value: content.color },
    { label: 'Condition', value: content.condition },
    { label: 'Function', value: content.function },
    { label: 'Brand', value: content.brand },
    { label: 'Model', value: content.model }
  ];

  const getConditionColor = (condition?: string) => {
    switch (condition) {
      case 'New':
      case 'Like New':
        return 'success';
      case 'Good':
        return 'primary';
      case 'Fair':
        return 'secondary';
      case 'Worn':
      case 'Damaged':
      case 'Broken':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attributes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {attributes.map(({ label, value }) => value && (
            <div key={label} className="space-y-1">
              <div className="text-sm font-medium text-muted-foreground">{label}</div>
              <div>
                {label === 'Condition' ? (
                  <Badge variant={getConditionColor(value)}>{value}</Badge>
                ) : (
                  value
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-muted-foreground">Fragile</div>
          <Badge variant={content.fragile ? 'destructive' : 'secondary'}>
            {content.fragile ? 'Yes' : 'No'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}