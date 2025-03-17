'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { type ContentFormData } from '@/lib/schemas/content-schema';
import { type ContentWithContainer } from '@/types/container';

export function useContents(containerId: string) {
  const [loading, setLoading] = useState(false);

  const addContent = async (data: ContentFormData) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('contents')
        .insert([{
          container_id: containerId,
          item_name: data.itemName,
          quantity: 1,
          category: data.category,
          material: data.material,
          size: data.size,
          color: data.color,
          secondary_color: data.secondaryColor,
          condition: data.condition,
          function: data.function,
          fragile: data.fragile,
          brand: data.brand,
          model: data.model,
          image_url: data.imageUrl,
        }]);

      if (error) throw error;
      toast.success('Items added successfully');
      return true;
    } catch (error) {
      console.error('Failed to add items:', error);
      toast.error('Failed to add items');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: string, data: ContentFormData) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('contents')
        .update({
          item_name: data.itemName,
          category: data.category,
          material: data.material,
          size: data.size,
          color: data.color,
          secondary_color: data.secondaryColor,
          condition: data.condition,
          function: data.function,
          fragile: data.fragile,
          brand: data.brand,
          model: data.model,
          image_url: data.imageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      toast.success('Item updated successfully');
      return true;
    } catch (error) {
      console.error('Failed to update item:', error);
      toast.error('Failed to update item');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Item removed');
      return true;
    } catch (error) {
      console.error('Failed to delete item:', error);
      toast.error('Failed to remove item');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addContent,
    updateContent,
    deleteContent,
  };
}