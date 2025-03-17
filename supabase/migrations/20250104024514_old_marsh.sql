-- Fix user profiles table and triggers
ALTER TABLE user_profiles
ADD COLUMN settings JSONB DEFAULT '{"theme": "system"}'::jsonb,
ADD COLUMN last_login TIMESTAMPTZ;

-- Update the handle_new_user function to include settings
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.user_profiles (
    user_id,
    display_name,
    settings,
    last_login
  )
  VALUES (
    NEW.id,
    COALESCE(
      (NEW.raw_user_meta_data ->> 'full_name'),
      split_part(NEW.email, '@', 1)
    ),
    '{"theme": "system"}'::jsonb,
    now()
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Failed to create user profile: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update containers table to include location
ALTER TABLE containers
ADD COLUMN location TEXT DEFAULT 'Other',
ADD COLUMN location_details JSONB DEFAULT '{}'::jsonb;

-- Create locations table for predefined storage locations
CREATE TABLE IF NOT EXISTS storage_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on storage_locations
ALTER TABLE storage_locations ENABLE ROW LEVEL SECURITY;

-- Create policies for storage_locations
CREATE POLICY "Users can manage their storage locations"
  ON storage_locations
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());