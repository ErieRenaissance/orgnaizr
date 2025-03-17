'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ItemForm } from './item-form';
import { type Content } from '@/types/container';

interface ItemFormDialogProps {
  containerId: string;
  item?: Content;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ItemFormDialog({
  containerId,
  item,
  open,
  onOpenChange,
  onSuccess,
}: ItemFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        </DialogHeader>
        <ItemForm
          containerId={containerId}
          initialData={item}
          onSuccess={() => {
            onSuccess();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}