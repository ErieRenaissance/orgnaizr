'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSelector } from '@/components/settings/theme-selector';

export default function AppearancePage() {
  return (
    <div className="container max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Appearance Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeSelector />
        </CardContent>
      </Card>
    </div>
  );
}