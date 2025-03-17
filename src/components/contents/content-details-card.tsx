import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type Content } from '@/types/container';

interface ContentDetailsCardProps {
  content: Content;
}

export function ContentDetailsCard({ content }: ContentDetailsCardProps) {
  const details = [
    { label: 'Quantity', value: content.quantity },
    { label: 'Category', value: content.category },
    { label: 'Material', value: content.material },
    { label: 'Size', value: content.size },
    { label: 'Color', value: content.color },
    { label: 'Condition', value: content.condition },
    { label: 'Function', value: content.function },
    { label: 'Brand', value: content.brand },
    { label: 'Model', value: content.model },
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
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {details.map(({ label, value }) => value && (
          <div key={label}>
            <div className="text-sm font-medium text-muted-foreground">{label}</div>
            <div className="mt-1">
              {label === 'Condition' ? (
                <Badge variant={getConditionColor(value as string)}>{value}</Badge>
              ) : (
                value
              )}
            </div>
          </div>
        ))}

        {content.confidence_score && (
          <div>
            <div className="text-sm font-medium text-muted-foreground">Confidence Score</div>
            <div className="mt-1">{Math.round(content.confidence_score * 100)}%</div>
          </div>
        )}

        <div>
          <div className="text-sm font-medium text-muted-foreground">Container</div>
          <div className="mt-1">{content.containers?.name || 'Unknown'}</div>
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