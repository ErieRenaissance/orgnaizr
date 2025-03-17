import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ContainerForm } from './container-form';

interface ContainerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ContainerFormDialog({ open, onOpenChange, onSuccess }: ContainerFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Container</DialogTitle>
        </DialogHeader>
        <ContainerForm onSuccess={() => {
          onSuccess?.();
          onOpenChange(false);
        }} />
      </DialogContent>
    </Dialog>
  );
}