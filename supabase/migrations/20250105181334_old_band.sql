-- Function to split existing content records with quantity > 1
CREATE OR REPLACE FUNCTION split_content_records()
RETURNS void AS $$
DECLARE
  content_record RECORD;
BEGIN
  FOR content_record IN 
    SELECT * FROM contents 
    WHERE quantity > 1
  LOOP
    -- Create individual records for each item
    FOR i IN 2..content_record.quantity LOOP
      INSERT INTO contents (
        container_id,
        item_name,
        quantity,
        category,
        material,
        size,
        color,
        condition,
        function,
        fragile,
        brand,
        model,
        image_url,
        confidence_score,
        created_at
      ) VALUES (
        content_record.container_id,
        content_record.item_name,
        1,
        content_record.category,
        content_record.material,
        content_record.size,
        content_record.color,
        content_record.condition,
        content_record.function,
        content_record.fragile,
        content_record.brand,
        content_record.model,
        content_record.image_url,
        content_record.confidence_score,
        content_record.created_at
      );
    END LOOP;
    
    -- Update original record to quantity 1
    UPDATE contents 
    SET quantity = 1 
    WHERE id = content_record.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Execute the function to split existing records
SELECT split_content_records();

-- Drop the function after use
DROP FUNCTION split_content_records();

-- Add constraint to ensure quantity is always 1
ALTER TABLE contents ADD CONSTRAINT quantity_is_one CHECK (quantity = 1);