import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ClickableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClick: () => void;
}

export function ClickableCard({ children, className, onClick, ...props }: ClickableCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-shadow hover:shadow-md",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Card>
  );
}

export { CardHeader, CardContent };