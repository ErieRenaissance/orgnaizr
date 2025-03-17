import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { generateContainerQR, printQRCode, type ContainerQRData } from '@/lib/services/qr-service';
import { useState } from 'react';
import { toast } from 'sonner';

interface QRCodeActionsProps {
  containerData: ContainerQRData;
  qrCode: string;
}

export function QRCodeActions({ containerData, qrCode }: QRCodeActionsProps) {
  const [downloading, setDownloading] = useState(false);
  const [printing, setPrinting] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `${containerData.containerName}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error('Failed to download QR code');
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = async () => {
    try {
      setPrinting(true);
      printQRCode(qrCode, containerData.containerName);
    } catch (error) {
      toast.error('Failed to print QR code');
    } finally {
      setPrinting(false);
    }
  };

  return (
    <div className="flex justify-center space-x-4">
      <Button 
        onClick={handleDownload} 
        disabled={downloading}
      >
        <Download className="mr-2 h-4 w-4" />
        {downloading ? 'Downloading...' : 'Download'}
      </Button>
      <Button 
        variant="outline" 
        onClick={handlePrint}
        disabled={printing}
      >
        <Printer className="mr-2 h-4 w-4" />
        {printing ? 'Printing...' : 'Print'}
      </Button>
    </div>
  );
}