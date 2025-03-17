import { useNavigate } from 'react-router-dom';
import { ClickableCard, CardHeader, CardContent } from '@/components/common/clickable-card';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Box, QrCode, Trash2 } from 'lucide-react';
import { type Container } from '@/types/container';

interface ContainerCardProps {
  container: Container;
  onDelete: (id: string) => Promise<void>;
}

export function ContainerCard({ container, onDelete }: ContainerCardProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking buttons
    if ((e.target as HTMLElement).closest('button')) {
      e.stopPropagation();
      return;
    }
    navigate(`/containers/${container.id}`);
  };

  return (
    <ClickableCard onClick={handleClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {container.name}
        </CardTitle>
        <Box className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {container.description}
        </div>
        <div className="mt-4 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/containers/${container.id}/qr`);
            }}
          >
            <QrCode className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(container.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </ClickableCard>
  );
}