-- Rename 'Yech' to 'Tech' in all tables and references

-- This migration assumes that the original tables were created with 'Yech' naming
-- and we're now correcting them to 'Tech'

-- If the tables are already named correctly (Tech), this migration will have no effect

-- Rename tables if they exist with the old naming
ALTER TABLE IF EXISTS "YechFam" RENAME TO "TechFam";
ALTER TABLE IF EXISTS "Yech" RENAME TO "Tech";

-- Update foreign key references - only if the column exists
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tech' AND column_name = 'yechfamid') THEN
    ALTER TABLE "Tech" RENAME COLUMN "yechFamId" TO "techFamId";
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'controls' AND column_name = 'yechid') THEN
    ALTER TABLE "Controls" RENAME COLUMN "yechId" TO "techId";
  END IF;
END $$;

-- Update sequence names if they exist
ALTER SEQUENCE IF EXISTS "YechFam_id_seq" RENAME TO "TechFam_id_seq";
ALTER SEQUENCE IF EXISTS "Yech_id_seq" RENAME TO "Tech_id_seq";

-- Enable realtime for these tables (only if they're not already in the publication)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'TechFam') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE "TechFam";
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'Tech') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE "Tech";
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'Controls') THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE "Controls";
  END IF;
END $$;
