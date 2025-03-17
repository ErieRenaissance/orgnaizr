/*
  # Set up file storage tables
  
  1. Create tables for managing file storage
  2. Set up RLS policies for secure access
  3. Add indexes for performance
*/

-- Create files table for storing container photos
CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bucket_id TEXT NOT NULL,
  name TEXT NOT NULL,
  size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(bucket_id, path)
);

-- Enable RLS
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can insert their own files"
  ON files
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own files"
  ON files
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    bucket_id = 'container-photos' -- Allow viewing container photos
  );

CREATE POLICY "Users can update their own files"
  ON files
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own files"
  ON files
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_files_bucket_path ON files(bucket_id, path);

-- Update containers table to reference files
ALTER TABLE containers
ADD COLUMN IF NOT EXISTS photo_file_id UUID REFERENCES files(id) ON DELETE SET NULL;