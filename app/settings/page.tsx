'use client';

import { UserSettings } from '@/components/settings/user-settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSelector } from '@/components/settings/theme-selector';
import { ProfileSettings } from '@/components/settings/profile-settings';
import { NotificationSettings } from '@/components/settings/notification-settings';

export default function SettingsPage() {
  return (
    <div className="container max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="space-y-6">
        <ProfileSettings />
        
        <Card>
          <CardHeader>
            <CardTitle>Theme Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeSelector />
          </CardContent>
        </Card>

        <NotificationSettings />
      </div>
    </div>
  );
}