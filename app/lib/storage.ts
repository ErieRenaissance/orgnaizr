import { supabase } from './supabase';

export async function uploadContainerPhoto(userId: string, photoData: string) {
  try {
    // Convert base64 to blob
    const base64Data = photoData.split(',')[1];
    const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(r => r.blob());
    
    // Generate unique filename
    const fileName = `${Date.now()}.jpg`;
    const path = `${userId}/${fileName}`;
    
    // Insert file record
    const { data: file, error: fileError } = await supabase
      .from('files')
      .insert({
        user_id: userId,
        bucket_id: 'container-photos',
        name: fileName,
        size: blob.size,
        mime_type: 'image/jpeg',
        path: path,
        metadata: {
          contentType: 'image/jpeg',
          type: 'container-photo'
        }
      })
      .select()
      .single();

    if (fileError) throw fileError;

    // Return the file ID and path
    return {
      id: file.id,
      url: `/api/files/container-photos/${path}`
    };
  } catch (error) {
    console.error('Failed to upload photo:', error);
    throw new Error('Failed to upload photo');
  }
}