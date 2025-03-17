import QRCode from 'qrcode';

export async function generateQRCode(data: string): Promise<string> {
  try {
    return await QRCode.toDataURL(data, {
      errorCorrectionLevel: 'H',
      margin: 1,
      width: 400,
    });
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
}