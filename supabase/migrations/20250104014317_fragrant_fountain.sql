/*
  # Create container management tables

  1. New Tables
    - `containers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `description` (text)
      - `qr_code` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `contents`
      - `id` (uuid, primary key)
      - `container_id` (uuid, references containers)
      - `item_name` (text)
      - `quantity` (integer)
      - `confidence_score` (float)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `tags`
      - `id` (uuid, primary key)
      - `content_id` (uuid, references contents)
      - `tag_name` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create containers table
CREATE TABLE IF NOT EXISTS containers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  qr_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contents table
CREATE TABLE IF NOT EXISTS contents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  container_id uuid REFERENCES containers(id) ON DELETE CASCADE,
  item_name text NOT NULL,
  quantity integer DEFAULT 1,
  confidence_score float,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id uuid REFERENCES contents(id) ON DELETE CASCADE,
  tag_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE containers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Create policies for containers
CREATE POLICY "Users can create their own containers"
  ON containers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own containers"
  ON containers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own containers"
  ON containers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own containers"
  ON containers
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for contents
CREATE POLICY "Users can manage contents of their containers"
  ON contents
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

-- Create policies for tags
CREATE POLICY "Users can manage tags of their contents"
  ON tags
  TO authenticated
  USING (
    content_id IN (
      SELECT c.id FROM contents c
      JOIN containers cont ON c.container_id = cont.id
      WHERE cont.user_id = auth.uid()
    )
  )
  WITH CHECK (
    content_id IN (
      SELECT c.id FROM contents c
      JOIN containers cont ON c.container_id = cont.id
      WHERE cont.user_id = auth.uid()
    )
  );