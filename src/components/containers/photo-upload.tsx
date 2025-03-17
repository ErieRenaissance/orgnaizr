'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Upload, X } from 'lucide-react';
import { CameraCapture } from '@/components/camera/camera-capture';

interface PhotoUploadProps {
  value?: string;
  onChange: (value: string) => void;
}

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const [showCamera, setShowCamera] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = (image: string) => {
    onChange(image);
    setShowCamera(false);
  };

  if (showCamera) {
    return (
      <div className="space-y-4">
        <CameraCapture onCapture={handleCapture} />
        <Button 
          variant="outline" 
          onClick={() => setShowCamera(false)}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Item"
            className="w-full h-48 object-cover rounded-lg"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => onChange('')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-48 flex flex-col items-center justify-center"
            onClick={() => setShowCamera(true)}
          >
            <Camera className="h-8 w-8 mb-2" />
            Take Photo
          </Button>
          <div className="relative h-48">
            <Button
              variant="outline"
              className="absolute inset-0 flex flex-col items-center justify-center"
              asChild
            >
              <label>
                <Upload className="h-8 w-8 mb-2" />
                Upload Photo
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}