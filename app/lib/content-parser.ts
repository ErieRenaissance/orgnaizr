import { type ProcessedContent } from '@/types/content';

export function parseVisionResponse(response: string): ProcessedContent[] {
  try {
    if (response.startsWith('[') || response.startsWith('{')) {
      return JSON.parse(response);
    }

    const lines = response.split('\n').filter(line => line.trim());
    return lines.map(line => {
      const match = line.match(/(\d+)\s*x?\s*(.+)/i) || [null, '1', line];
      return {
        itemName: match[2].trim(),
        quantity: parseInt(match[1], 10) || 1,
        confidenceScore: 0.8,
      };
    });
  } catch (error) {
    console.error('Failed to parse vision response:', error);
    return [];
  }
}