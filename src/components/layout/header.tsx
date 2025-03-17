'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useUserProfile } from '@/hooks/use-user-profile';
import { Link } from 'react-router-dom';
import { Box, LogOut, Settings, QrCode } from 'lucide-react';
import { ThemeSelector } from '@/components/settings/theme-selector';
import { useState } from 'react';
import { QRScanner } from '@/components/containers/qr-scanner';

export function Header() {
  const { user, signOut } = useAuth();
  const { profile } = useUserProfile();
  const [showScanner, setShowScanner] = useState(false);

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Box className="h-6 w-6" />
          <span className="font-bold">Storage Manager</span>
        </Link>
        
        {user && (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setShowScanner(true)}>
              <QrCode className="h-4 w-4" />
            </Button>
            <ThemeSelector />
            <Button variant="ghost" asChild>
              <Link to="/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {profile?.display_name}
            </span>
          </div>
        )}
      </div>

      <QRScanner open={showScanner} onOpenChange={setShowScanner} />
    </header>
  );
}