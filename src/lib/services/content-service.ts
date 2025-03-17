import { supabase } from '@/lib/supabase';
import { type ContentFormData } from '@/lib/schemas/content-schema';

export async function addContent(containerId: string, data: ContentFormData) {
  try {
    const records = Array.from({ length: data.quantity }, () => ({
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
    }));

    const { error } = await supabase
      .from('contents')
      .insert(records);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to add items:', error);
    throw error;
  }
}

export async function updateContent(id: string, data: ContentFormData) {
  try {
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
    return true;
  } catch (error) {
    console.error('Failed to update item:', error);
    throw error;
  }
}

export async function deleteContent(id: string) {
  try {
    const { error } = await supabase
      .from('contents')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to delete item:', error);
    throw error;
  }
}