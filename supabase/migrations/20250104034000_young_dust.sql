/*
  # Add container type and location fields

  1. New Fields
    - Add type field for container type (cardboard box, plastic tote, etc)
    - Add location_id field to link containers to storage locations
    - Add photo_url field for container images

  2. Changes
    - Add NOT NULL constraint to user_id
    - Add foreign key constraint for location_id
*/

-- Add new columns to containers table
ALTER TABLE containers
ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'Other',
ADD COLUMN IF NOT EXISTS location_id UUID REFERENCES storage_locations(id),
ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Add NOT NULL constraint to user_id if not already present
ALTER TABLE containers 
ALTER COLUMN user_id SET NOT NULL;