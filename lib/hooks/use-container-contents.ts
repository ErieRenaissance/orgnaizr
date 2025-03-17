'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/auth';
import { toast } from 'sonner';
import { type Database } from '@/types/supabase';

type Content = Database['public']['Tables']['contents']['Row'];

export function useContainerContents(containerId: string) {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadContents();
  }, [containerId]);

  const loadContents = async () => {
    try {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('container_id', containerId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      toast.error('Failed to load contents');
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setContents(contents.filter(c => c.id !== id));
      toast.success('Item removed');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const addContent = async (newContent: Omit<Content, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('contents')
        .insert([newContent]);
      
      if (error) throw error;
      
      await loadContents();
      return true;
    } catch (error) {
      toast.error('Failed to add item');
      return false;
    }
  };

  return {
    contents,
    loading,
    deleteContent,
    addContent,
    refresh: loadContents,
  };
}