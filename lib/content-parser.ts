import { type ProcessedContent } from '@/types/content';

export function parseVisionResponse(response: string): ProcessedContent[] {
  try {
    // Handle both JSON and text responses
    if (response.startsWith('[') || response.startsWith('{')) {
      return JSON.parse(response);
    }

    // Parse text response into structured format
    const lines = response.split('\n').filter(line => line.trim());
    return lines.map(line => {
      const match = line.match(/(\d+)\s*x?\s*(.+)/i) || [null, '1', line];
      return {
        itemName: match[2].trim(),
        quantity: parseInt(match[1], 10) || 1,
        confidenceScore: 0.8, // Default confidence for text parsing
      };
    });
  } catch (error) {
    console.error('Failed to parse vision response:', error);
    return [];
  }
}