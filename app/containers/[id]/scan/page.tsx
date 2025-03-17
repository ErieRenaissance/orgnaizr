'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CameraCapture } from '@/components/camera/camera-capture';
import { Button } from '@/components/ui/button';
import { analyzeImage } from '@/lib/vision';
import { parseVisionResponse } from '@/lib/content-parser';
import { toast } from 'sonner';
import { useContents } from '@/hooks/use-contents';
import { type ProcessedContent } from '@/types/content';

export default function ScanPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { addContent } = useContents(params.id);

  const handleCapture = (capturedImage: string) => {
    setImage(capturedImage);
  };

  const handleAnalysis = async () => {
    if (!image) return;

    try {
      setIsAnalyzing(true);
      const response = await analyzeImage(image);
      const items = parseVisionResponse(response);

      await Promise.all(
        items.map(item => addContent({
          container_id: params.id,
          item_name: item.itemName,
          quantity: item.quantity,
          confidence_score: item.confidenceScore,
        }))
      );
      
      toast.success('Items added successfully');
      router.push(`/containers/${params.id}`);
    } catch (error) {
      toast.error('Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto p-8 space-y-6">
      {!image ? (
        <CameraCapture onCapture={handleCapture} />
      ) : (
        <div className="space-y-4">
          <img
            src={image}
            alt="Captured"
            className="w-full rounded-lg"
          />
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => setImage(null)}
              variant="outline"
            >
              Retake
            </Button>
            <Button
              onClick={handleAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Contents'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}