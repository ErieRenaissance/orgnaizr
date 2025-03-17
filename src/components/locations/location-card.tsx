import { useNavigate } from 'react-router-dom';
import { ClickableCard, CardHeader, CardContent } from '@/components/common/clickable-card';
import { CardTitle } from '@/components/ui/card';
import { Box } from 'lucide-react';
import { type StorageLocation } from '@/hooks/use-locations';

interface LocationCardProps {
  location: StorageLocation;
}

export function LocationCard({ location }: LocationCardProps) {
  const navigate = useNavigate();

  return (
    <ClickableCard onClick={() => navigate(`/locations/${location.id}`)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Box className="h-5 w-5" />
          {location.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Type: {location.type}
        </p>
      </CardContent>
    </ClickableCard>
  );
}