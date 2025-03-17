import QRCode from 'qrcode';

export interface QRCodeOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export interface ContainerQRData {
  containerId: string;
  containerName: string;
  dateGenerated: string;
}

export async function generateContainerQR(data: ContainerQRData, options: QRCodeOptions = {}): Promise<string> {
  try {
    const defaultOptions = {
      width: 400,
      margin: 1,
      errorCorrectionLevel: 'H' as const,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    };

    return await QRCode.toDataURL(JSON.stringify(data), {
      ...defaultOptions,
      ...options,
    });
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

export function printQRCode(qrCode: string, containerName: string) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>QR Code - ${containerName}</title>
        <style>
          body {
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            font-family: system-ui, -apple-system, sans-serif;
          }
          .container {
            text-align: center;
            max-width: 500px;
          }
          h1 {
            margin-bottom: 10px;
            color: #000;
          }
          p {
            margin: 0 0 20px;
            color: #666;
          }
          img {
            max-width: 100%;
            height: auto;
            margin-bottom: 20px;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${containerName}</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
          <img src="${qrCode}" alt="QR Code" />
        </div>
        <script>
          window.onload = () => {
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 500);
            }, 250);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}