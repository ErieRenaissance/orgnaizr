import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LocationForm } from './location-form';

interface LocationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function LocationFormDialog({ open, onOpenChange, onSuccess }: LocationFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Storage Location</DialogTitle>
        </DialogHeader>
        <LocationForm onSuccess={() => {
          onSuccess?.();
          onOpenChange(false);
        }} />
      </DialogContent>
    </Dialog>
  );
}