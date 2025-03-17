```tsx
interface ContentCardImageProps {
  imageUrl: string | null;
  altText: string;
}

export function ContentCardImage({ imageUrl, altText }: ContentCardImageProps) {
  if (!imageUrl) return null;

  return (
    <div className="relative h-32 w-full">
      <img
        src={imageUrl}
        alt={altText}
        className="rounded object-cover w-full h-full"
      />
    </div>
  );
}
```