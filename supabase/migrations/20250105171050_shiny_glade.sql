/*
  # Update Content Schema and Relationships

  1. Changes
    - Add content_groups table for categorizing items
    - Add default values for content attributes
    - Update existing records with default values
    - Add foreign key constraints

  2. New Tables
    - content_groups
      - id (uuid, primary key)
      - container_id (uuid, foreign key)
      - name (text)
      - description (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  3. Updates
    - Add content_group_id to contents table
    - Set default values for all attribute fields
*/

-- Create content_groups table
CREATE TABLE IF NOT EXISTS content_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  container_id UUID REFERENCES containers(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on content_groups
ALTER TABLE content_groups ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for content_groups
CREATE POLICY "Users can manage content groups for their containers"
  ON content_groups
  TO authenticated
  USING (
    container_id IN (
      SELECT id FROM containers WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    container_id IN (
      SELECT id FROM containers WHERE user_id = auth.uid()
    )
  );

-- Add content_group_id to contents
ALTER TABLE contents
ADD COLUMN IF NOT EXISTS content_group_id UUID REFERENCES content_groups(id) ON DELETE CASCADE;

-- Create default content groups for existing containers
INSERT INTO content_groups (container_id, name, description)
SELECT DISTINCT
  container_id,
  'General',
  'Default content group'
FROM contents
WHERE content_group_id IS NULL;

-- Update existing contents with default content group
UPDATE contents c
SET content_group_id = cg.id
FROM content_groups cg
WHERE c.container_id = cg.container_id
AND c.content_group_id IS NULL;

-- Set default values for existing records
UPDATE contents
SET
  category = COALESCE(category, 'Miscellaneous'),
  material = COALESCE(material, 'Unknown'),
  size = COALESCE(size, 'Medium'),
  color = COALESCE(color, 'Black'),
  condition = COALESCE(condition, 'Good'),
  function = COALESCE(function, 'Miscellaneous'),
  fragile = COALESCE(fragile, false),
  brand = COALESCE(brand, ''),
  model = COALESCE(model, '')
WHERE category IS NULL
   OR material IS NULL
   OR size IS NULL
   OR color IS NULL
   OR condition IS NULL
   OR function IS NULL
   OR fragile IS NULL;

-- Add NOT NULL constraints after setting defaults
ALTER TABLE contents
  ALTER COLUMN category SET NOT NULL,
  ALTER COLUMN material SET NOT NULL,
  ALTER COLUMN size SET NOT NULL,
  ALTER COLUMN color SET NOT NULL,
  ALTER COLUMN condition SET NOT NULL,
  ALTER COLUMN function SET NOT NULL,
  ALTER COLUMN fragile SET NOT NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contents_content_group_id ON contents(content_group_id);
CREATE INDEX IF NOT EXISTS idx_content_groups_container_id ON content_groups(container_id);