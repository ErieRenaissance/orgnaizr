'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useSettings } from '@/hooks/use-settings';
import { Skeleton } from '@/components/ui/skeleton';

export function NotificationSettings() {
  const { settings, loading, updateSettings } = useSettings();

  const handleNotificationChange = async (type: keyof typeof settings.notifications, enabled: boolean) => {
    await updateSettings({
      notifications: {
        ...settings?.notifications,
        [type]: enabled
      }
    });
  };

  if (loading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Manage how you receive notifications and alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates and alerts via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings?.notifications?.email ?? false}
              onCheckedChange={(checked) => handleNotificationChange('email', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get instant notifications on your device
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings?.notifications?.push ?? false}
              onCheckedChange={(checked) => handleNotificationChange('push', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="low-stock-alerts">Low Stock Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when items are running low
              </p>
            </div>
            <Switch
              id="low-stock-alerts"
              checked={settings?.notifications?.lowStock ?? false}
              onCheckedChange={(checked) => handleNotificationChange('lowStock', checked)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}