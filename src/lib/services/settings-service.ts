import { supabase } from '../supabase';
import { toast } from 'sonner';

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    lowStock: boolean;
  };
}

export async function updateUserSettings(settings: Partial<UserSettings>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('user_profiles')
      .update({
        settings: settings
      })
      .eq('user_id', user.id);

    if (error) throw error;
    toast.success('Settings updated successfully');
    return true;
  } catch (error) {
    console.error('Failed to update settings:', error);
    toast.error('Failed to update settings');
    return false;
  }
}

export async function getUserSettings(): Promise<UserSettings | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('settings')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data?.settings || null;
  } catch (error) {
    console.error('Failed to get settings:', error);
    return null;
  }
}