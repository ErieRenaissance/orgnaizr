/*
  # Add Item Attributes

  1. Changes
    - Add new columns to contents table for item attributes
    - Add check constraints for enum values
    - Add indexes for commonly queried columns

  2. New Columns
    - category: Item category (e.g., Tools, Electronics)
    - material: Primary material
    - size: Size category
    - color: Primary color
    - condition: Item condition
    - function: Primary function/use
    - fragile: Whether item is fragile
    - brand: Item brand (optional)
    - model: Item model (optional)
*/

-- Add new columns to contents table
ALTER TABLE contents
ADD COLUMN category TEXT,
ADD COLUMN material TEXT,
ADD COLUMN size TEXT,
ADD COLUMN color TEXT,
ADD COLUMN condition TEXT,
ADD COLUMN function TEXT,
ADD COLUMN fragile BOOLEAN DEFAULT false,
ADD COLUMN brand TEXT,
ADD COLUMN model TEXT;

-- Create indexes for commonly queried columns
CREATE INDEX IF NOT EXISTS idx_contents_category ON contents(category);
CREATE INDEX IF NOT EXISTS idx_contents_material ON contents(material);
CREATE INDEX IF NOT EXISTS idx_contents_condition ON contents(condition);
CREATE INDEX IF NOT EXISTS idx_contents_brand ON contents(brand);

-- Add check constraints for enum values
DO $$ BEGIN
  ALTER TABLE contents
    ADD CONSTRAINT contents_category_check
    CHECK (category IN (
      'Tools', 'Electronics', 'Stationery', 'Hardware/Fasteners',
      'Household Item', 'Miscellaneous', 'Decorative Item', 'Toy',
      'Medical Supply', 'Clothing', 'Accessories'
    ));

  ALTER TABLE contents
    ADD CONSTRAINT contents_material_check
    CHECK (material IN (
      'Metal', 'Plastic', 'Wood', 'Glass', 'Rubber', 'Fabric',
      'Paper/Cardboard', 'Ceramic', 'Leather', 'Composite/Other', 'Unknown'
    ));

  ALTER TABLE contents
    ADD CONSTRAINT contents_size_check
    CHECK (size IN (
      'Very Small', 'Small', 'Medium', 'Large', 'Very Large'
    ));

  ALTER TABLE contents
    ADD CONSTRAINT contents_color_check
    CHECK (color IN (
      'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow',
      'Orange', 'Brown', 'Grey', 'Pink', 'Multicolor'
    ));

  ALTER TABLE contents
    ADD CONSTRAINT contents_condition_check
    CHECK (condition IN (
      'New', 'Like New', 'Good', 'Fair', 'Worn', 'Damaged', 'Broken'
    ));

  ALTER TABLE contents
    ADD CONSTRAINT contents_function_check
    CHECK (function IN (
      'Cutting', 'Fastening', 'Measuring', 'Writing', 'Repairing',
      'Organizing', 'Cleaning', 'Decorative', 'Power Supply/Charging',
      'Data Storage', 'Miscellaneous'
    ));
END $$;