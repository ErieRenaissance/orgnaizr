import { useState, useEffect } from 'react';
import { updateUserSettings, getUserSettings, type UserSettings } from '@/lib/services/settings-service';

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const data = await getUserSettings();
    setSettings(data);
    setLoading(false);
  };

  const updateSettings = async (newSettings: Partial<UserSettings>) => {
    const success = await updateUserSettings(newSettings);
    if (success) {
      setSettings(prev => prev ? { ...prev, ...newSettings } : null);
    }
    return success;
  };

  return {
    settings,
    loading,
    updateSettings
  };
}