'use client';

import { Button } from '@/components/ui/button';
import { Box } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Organize your space, find your peace
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Track and manage your stored items with AI-powered organization. Never lose track of what's in your storage containers again.
          </p>
          <div className="mt-10 flex gap-x-6">
            <Button asChild size="lg">
              <Link to="/auth">
                <Box className="mr-2 h-5 w-5" />
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}