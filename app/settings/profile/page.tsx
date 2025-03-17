'use client';

import { ProfileSettings } from '@/components/settings/profile-settings';

export default function ProfilePage() {
  return (
    <div className="container max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
      <ProfileSettings />
    </div>
  );
}