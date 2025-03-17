'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { type Database } from '@/types/supabase';

export type StorageLocation = Database['public']['Tables']['storage_locations']['Row'];

export function useLocations() {
  const [locations, setLocations] = useState<StorageLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('storage_locations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error('Error loading locations:', error);
      toast.error('Failed to load storage locations');
    } finally {
      setLoading(false);
    }
  };

  const createLocation = async (data: Pick<StorageLocation, 'name' | 'type'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('storage_locations')
        .insert([{ ...data, user_id: user.id }]);

      if (error) throw error;
      
      await loadLocations();
      toast.success('Location created successfully');
      return true;
    } catch (error) {
      console.error('Error creating location:', error);
      toast.error('Failed to create location');
      return false;
    }
  };

  const updateLocation = async (id: string, data: Partial<StorageLocation>) => {
    try {
      const { error } = await supabase
        .from('storage_locations')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      
      await loadLocations();
      return true;
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('storage_locations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setLocations(locations.filter(l => l.id !== id));
      toast.success('Location deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting location:', error);
      toast.error('Failed to delete location');
      return false;
    }
  };

  return {
    locations,
    loading,
    createLocation,
    updateLocation,
    deleteLocation,
    refresh: loadLocations,
  };
}