'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadContainerPhoto } from '@/lib/storage';
import { toast } from 'sonner';
import { type ContainerFormData } from '@/types/container-types';
import { type ContainerWithLocation } from '@/types/container';

export function useContainers() {
  const [containers, setContainers] = useState<ContainerWithLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContainers();
  }, []);

  const loadContainers = async () => {
    try {
      const { data, error } = await supabase
        .from('containers')
        .select('*, storage_locations(name, type)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContainers(data || []);
    } catch (error) {
      console.error('Failed to load containers:', error);
      toast.error('Failed to load containers');
    } finally {
      setLoading(false);
    }
  };

  const createContainer = async (data: ContainerFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload photo if provided
      let photoFileId = null;
      if (data.photo) {
        const { id } = await uploadContainerPhoto(user.id, data.photo);
        photoFileId = id;
      }

      const { error } = await supabase
        .from('containers')
        .insert([{
          name: data.name,
          description: data.description,
          type: data.type,
          location_id: data.locationId,
          photo_file_id: photoFileId,
          user_id: user.id,
        }]);

      if (error) throw error;

      await loadContainers();
      toast.success('Container created successfully');
      return true;
    } catch (error) {
      console.error('Failed to create container:', error);
      toast.error('Failed to create container');
      return false;
    }
  };

  const updateContainer = async (id: string, data: Partial<ContainerFormData>) => {
    try {
      const { error } = await supabase
        .from('containers')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      await loadContainers();
      return true;
    } catch (error) {
      console.error('Failed to update container:', error);
      toast.error('Failed to update container');
      return false;
    }
  };

  const deleteContainer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('containers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setContainers(containers.filter(c => c.id !== id));
      toast.success('Container deleted');
      return true;
    } catch (error) {
      console.error('Failed to delete container:', error);
      toast.error('Failed to delete container');
      return false;
    }
  };

  return {
    containers,
    loading,
    createContainer,
    updateContainer,
    deleteContainer,
    refresh: loadContainers,
  };
}