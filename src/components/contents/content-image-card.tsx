import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContentImageCardProps {
  imageUrl: string;
  alt: string;
}

export function ContentImageCard({ imageUrl, alt }: ContentImageCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={imageUrl}
          alt={alt}
          className="rounded-lg object-cover w-full"
        />
      </CardContent>
    </Card>
  );
}