'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { useUserProfile } from '@/hooks/use-user-profile';
import { Moon, Sun, Monitor } from 'lucide-react';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { updateTheme } = useUserProfile();

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    await updateTheme(newTheme);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={theme === 'light' ? 'default' : 'outline'}
        size="icon"
        onClick={() => handleThemeChange('light')}
        title="Light Theme"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'outline'}
        size="icon"
        onClick={() => handleThemeChange('dark')}
        title="Dark Theme"
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'outline'}
        size="icon"
        onClick={() => handleThemeChange('system')}
        title="System Theme"
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
}