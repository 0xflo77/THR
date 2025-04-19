-- Create TechFam table
CREATE TABLE IF NOT EXISTS "TechFam" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Yech table
CREATE TABLE IF NOT EXISTS "Yech" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "techFamId" UUID NOT NULL REFERENCES "TechFam"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Controls table
CREATE TABLE IF NOT EXISTS "Controls" (
  "id" TEXT PRIMARY KEY,
  "controlFamily" TEXT NOT NULL,
  "controlType" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "statement" TEXT NOT NULL,
  "monitorID" TEXT NOT NULL,
  "recommendation" TEXT NOT NULL,
  "THR_code" TEXT NOT NULL,
  "comments" TEXT,
  "techId" UUID NOT NULL REFERENCES "Yech"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for all tables
alter publication supabase_realtime add table "TechFam";
alter publication supabase_realtime add table "Yech";
alter publication supabase_realtime add table "Controls";
