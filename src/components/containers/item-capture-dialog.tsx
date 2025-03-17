'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Upload } from 'lucide-react';
import { CameraCapture } from '@/components/camera/camera-capture';
import { ContentForm } from '@/components/containers/content-form';

interface ItemCaptureDialogProps {
  containerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

type CaptureMode = 'camera' | 'manual' | null;

export function ItemCaptureDialog({ 
  containerId, 
  open, 
  onOpenChange,
  onSuccess,
}: ItemCaptureDialogProps) {
  const [mode, setMode] = useState<CaptureMode>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (image: string) => {
    setCapturedImage(image);
  };

  const resetState = () => {
    setMode(null);
    setCapturedImage(null);
  };

  const handleClose = () => {
    resetState();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Items to Container</DialogTitle>
        </DialogHeader>

        {!mode && (
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setMode('camera')}
              className="h-32 flex flex-col items-center justify-center"
            >
              <Camera className="h-8 w-8 mb-2" />
              Take Photo
            </Button>
            <Button
              onClick={() => setMode('manual')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center"
            >
              <Upload className="h-8 w-8 mb-2" />
              Add Manually
            </Button>
          </div>
        )}

        {mode === 'camera' && !capturedImage && (
          <CameraCapture onCapture={handleCapture} />
        )}

        {(mode === 'manual' || capturedImage) && (
          <ContentForm
            containerId={containerId}
            initialImage={capturedImage}
            onSuccess={() => {
              onSuccess();
              handleClose();
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}