'use client';

import { NotificationSettings } from '@/components/settings/notification-settings';

export default function NotificationsPage() {
  return (
    <div className="container max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Notification Settings</h1>
      <NotificationSettings />
    </div>
  );
}