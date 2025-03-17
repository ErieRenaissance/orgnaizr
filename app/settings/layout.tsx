'use client';

import { Header } from '@/components/layout/header';
import { NavigationMenu } from '@/components/layout/navigation-menu';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex-1 flex">
        <NavigationMenu />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}