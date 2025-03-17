-- Drop existing check constraints
ALTER TABLE contents 
  DROP CONSTRAINT IF EXISTS contents_category_check,
  DROP CONSTRAINT IF EXISTS contents_function_check;

-- Add updated check constraints
ALTER TABLE contents
  ADD CONSTRAINT contents_category_check
  CHECK (category IN (
    'Tools', 'Electronics', 'Stationery', 'Hardware/Fasteners',
    'Household Item', 'Miscellaneous', 'Decorative Item', 'Toy',
    'Medical Supply', 'Clothing', 'Accessories', 'Books/Periodicals'
  ));

ALTER TABLE contents
  ADD CONSTRAINT contents_function_check
  CHECK (function IN (
    'Cutting', 'Fastening', 'Measuring', 'Writing', 'Repairing',
    'Organizing', 'Cleaning', 'Decorative', 'Power Supply/Charging',
    'Data Storage', 'Entertainment', 'Miscellaneous'
  ));