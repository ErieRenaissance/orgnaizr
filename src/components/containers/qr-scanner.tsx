'use client';

import { useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRScanner({ open, onOpenChange }: QRScannerProps) {
  const [scanning, setScanning] = useState(true);
  const navigate = useNavigate();

  const handleDecode = (data: string) => {
    try {
      const containerData = JSON.parse(data);
      if (containerData.containerId) {
        navigate(`/containers/${containerData.containerId}`);
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Invalid QR code:', error);
      toast.error('Invalid QR code');
    }
  };

  const handleError = (error: Error) => {
    console.error('QR Scanner error:', error);
    toast.error('Failed to access camera');
    setScanning(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan Container QR Code</DialogTitle>
        </DialogHeader>
        
        {scanning ? (
          <div className="aspect-square">
            <QrScanner
              onDecode={handleDecode}
              onError={handleError}
              constraints={{
                facingMode: 'environment'
              }}
            />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Camera access is required to scan QR codes
            </p>
            <Button onClick={() => setScanning(true)}>
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}