-- Drop existing tables if they exist
DROP TABLE IF EXISTS "Controls";
DROP TABLE IF EXISTS "Tech";
DROP TABLE IF EXISTS "TechFam";

-- Create TechFam table
CREATE TABLE "TechFam" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Tech table
CREATE TABLE "Tech" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "techfam_id" UUID NOT NULL REFERENCES "TechFam"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create Controls table
CREATE TABLE "Controls" (
  "id" TEXT PRIMARY KEY,
  "tech_id" UUID NOT NULL REFERENCES "Tech"("id") ON DELETE CASCADE,
  "techfam_id" UUID NOT NULL REFERENCES "TechFam"("id") ON DELETE CASCADE,
  "controlFamily" TEXT NOT NULL,
  "controlType" TEXT NOT NULL,
  "ranking" INTEGER,
  "description" TEXT NOT NULL,
  "statement" TEXT NOT NULL,
  "recommendation" TEXT NOT NULL,
  "THR_code" TEXT NOT NULL,
  "comments" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE "TechFam";
ALTER PUBLICATION supabase_realtime ADD TABLE "Tech";
ALTER PUBLICATION supabase_realtime ADD TABLE "Controls";
