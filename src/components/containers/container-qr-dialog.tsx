import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { QRCodeDisplay } from './qr-code-display';

interface ContainerQRDialogProps {
  containerId: string;
  containerName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContainerQRDialog({
  containerId,
  containerName,
  open,
  onOpenChange,
}: ContainerQRDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code for {containerName}</DialogTitle>
        </DialogHeader>
        <QRCodeDisplay
          containerId={containerId}
          containerName={containerName}
        />
      </DialogContent>
    </Dialog>
  );
}