import { useEffect, useState } from 'react';
import { generateContainerQR, type ContainerQRData } from '@/lib/services/qr-service';
import { QRCodeActions } from './qr-code-actions';
import { Skeleton } from '@/components/ui/skeleton';

interface QRCodeDisplayProps {
  containerId: string;
  containerName: string;
}

export function QRCodeDisplay({ containerId, containerName }: QRCodeDisplayProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateCode = async () => {
      try {
        const containerData: ContainerQRData = {
          containerId,
          containerName,
          dateGenerated: new Date().toISOString(),
        };

        const code = await generateContainerQR(containerData);
        setQrCode(code);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      } finally {
        setLoading(false);
      }
    };

    generateCode();
  }, [containerId, containerName]);

  if (loading) {
    return <Skeleton className="w-full aspect-square max-w-md mx-auto" />;
  }

  if (!qrCode) {
    return <div>Failed to generate QR code</div>;
  }

  const containerData: ContainerQRData = {
    containerId,
    containerName,
    dateGenerated: new Date().toISOString(),
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <img
          src={qrCode}
          alt="QR Code"
          className="w-full max-w-[400px] mx-auto"
        />
      </div>
      <QRCodeActions
        containerData={containerData}
        qrCode={qrCode}
      />
    </div>
  );
}