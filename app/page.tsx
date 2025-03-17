import { Hero } from '@/components/home/hero';
import { LocationGrid } from '@/components/home/location-grid';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <LocationGrid />
    </div>
  );
}