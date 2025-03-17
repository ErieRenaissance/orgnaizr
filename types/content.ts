export interface ProcessedContent {
  itemName: string;
  itemType: string;
  quantity: number;
  confidenceScore: number;
  tags?: string[];
}

export interface CameraConfig {
  facingMode: 'user' | 'environment';
  aspectRatio: number;
  gridEnabled: boolean;
}