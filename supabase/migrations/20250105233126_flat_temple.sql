-- Add secondary_color column
ALTER TABLE contents
ADD COLUMN secondary_color TEXT;

-- Add check constraint for secondary_color
ALTER TABLE contents
ADD CONSTRAINT contents_secondary_color_check
CHECK (secondary_color IS NULL OR secondary_color IN (
  'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow',
  'Orange', 'Brown', 'Grey', 'Pink', 'Multicolor'
));