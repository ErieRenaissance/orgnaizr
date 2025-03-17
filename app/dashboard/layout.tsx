'use client';

import { GlobalSearch } from '@/components/search/global-search';
import { Header } from '@/components/layout/header';
import { NavigationMenu } from '@/components/layout/navigation-menu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex-1 flex">
        <NavigationMenu />
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}