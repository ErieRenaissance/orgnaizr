/*
  # Storage Location and Container Management Update

  1. Changes
    - Creates storage_locations table for managing user storage locations
    - Updates containers table to reference storage locations
    - Adds proper RLS policies and constraints
    - Handles existing data migration

  2. Security
    - Enables RLS on storage_locations
    - Adds policies for user access control
*/

-- First check if storage_locations table exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'storage_locations') THEN
    -- Create storage locations table
    CREATE TABLE storage_locations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      details JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now(),
      CONSTRAINT unique_location_name_per_user UNIQUE(user_id, name)
    );

    -- Enable RLS
    ALTER TABLE storage_locations ENABLE ROW LEVEL SECURITY;

    -- Create RLS policies
    CREATE POLICY "Users can view their own storage locations"
      ON storage_locations
      FOR SELECT
      TO authenticated
      USING (user_id = auth.uid());

    CREATE POLICY "Users can insert their own storage locations"
      ON storage_locations
      FOR INSERT
      TO authenticated
      WITH CHECK (user_id = auth.uid());

    CREATE POLICY "Users can update their own storage locations"
      ON storage_locations
      FOR UPDATE
      TO authenticated
      USING (user_id = auth.uid())
      WITH CHECK (user_id = auth.uid());

    CREATE POLICY "Users can delete their own storage locations"
      ON storage_locations
      FOR DELETE
      TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

-- Add location_id to containers if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'containers' 
    AND column_name = 'location_id'
  ) THEN
    ALTER TABLE containers
    ADD COLUMN location_id UUID REFERENCES storage_locations(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Create unique constraint for container names within a location
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'unique_container_name_per_location'
  ) THEN
    ALTER TABLE containers
    ADD CONSTRAINT unique_container_name_per_location UNIQUE(location_id, name);
  END IF;
END $$;

-- Create default locations function if it doesn't exist
CREATE OR REPLACE FUNCTION create_default_locations()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO storage_locations (user_id, name, type)
  VALUES
    (NEW.id, 'My Garage', 'Garage'),
    (NEW.id, 'My Attic', 'Attic'),
    (NEW.id, 'My Storage Unit', 'Storage Unit'),
    (NEW.id, 'My Basement', 'Basement'),
    (NEW.id, 'My Closet', 'Closet'),
    (NEW.id, 'My Shed', 'Shed')
  ON CONFLICT (user_id, name) DO NOTHING;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Failed to create default locations: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or replace trigger for default locations
DROP TRIGGER IF EXISTS on_auth_user_created_locations ON auth.users;
CREATE TRIGGER on_auth_user_created_locations
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_locations();