import QRCode from 'qrcode';

interface QRCodeOptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  width?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export async function generateQRCode(data: string, options: QRCodeOptions = {}): Promise<string> {
  try {
    const defaultOptions: QRCodeOptions = {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 400,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    };

    return await QRCode.toDataURL(data, {
      ...defaultOptions,
      ...options,
    });
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}