import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Content } from '@/types/container';

interface ContentStatsProps {
  contents: Content[];
}

export function ContentStats({ contents }: ContentStatsProps) {
  const totalItems = contents.reduce((sum, content) => sum + content.quantity, 0);
  const uniqueItems = contents.length;
  const averageConfidence = contents.reduce((sum, content) => 
    sum + (content.confidence_score || 0), 0) / contents.length;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItems}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Unique Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueItems}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Avg. Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {averageConfidence ? `${Math.round(averageConfidence * 100)}%` : 'N/A'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}