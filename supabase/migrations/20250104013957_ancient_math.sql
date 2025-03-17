/*
  # Initial Schema Setup for Container Management System

  1. Tables Created
    - containers: Stores container information
    - contents: Stores items within containers
    - tags: Stores searchable tags for contents

  2. Security
    - Enable RLS on all tables
    - Add policies for user-based access control
    - Set up foreign key relationships

  3. Indexes
    - Added for improved query performance
    - Optimized for common search patterns
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Containers table
CREATE TABLE IF NOT EXISTS containers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  qr_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contents table
CREATE TABLE IF NOT EXISTS contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  container_id UUID REFERENCES containers(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  confidence_score FLOAT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID REFERENCES contents(id) ON DELETE CASCADE,
  tag_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE containers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Policies for containers
CREATE POLICY "Users can view own containers"
  ON containers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own containers"
  ON containers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own containers"
  ON containers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own containers"
  ON containers
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for contents
CREATE POLICY "Users can view contents of own containers"
  ON contents
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM containers
      WHERE containers.id = contents.container_id
      AND containers.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert contents to own containers"
  ON contents
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM containers
      WHERE containers.id = container_id
      AND containers.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update contents of own containers"
  ON contents
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM containers
      WHERE containers.id = container_id
      AND containers.user_id = auth.uid()
    )
  );

-- Policies for tags
CREATE POLICY "Users can view tags of own contents"
  ON tags
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM contents
      JOIN containers ON contents.container_id = containers.id
      WHERE contents.id = tags.content_id
      AND containers.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert tags to own contents"
  ON tags
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM contents
      JOIN containers ON contents.container_id = containers.id
      WHERE contents.id = content_id
      AND containers.user_id = auth.uid()
    )
  );

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_containers_user_id ON containers(user_id);
CREATE INDEX IF NOT EXISTS idx_contents_container_id ON contents(container_id);
CREATE INDEX IF NOT EXISTS idx_tags_content_id ON tags(content_id);
CREATE INDEX IF NOT EXISTS idx_tags_tag_name ON tags(tag_name);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_containers_updated_at
  BEFORE UPDATE ON containers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contents_updated_at
  BEFORE UPDATE ON contents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();