-- Fix sample controls to use existing tech family IDs

DO $$ 
DECLARE
  win10_id UUID;
  linux_id UUID;
  mssql_id UUID;
  oracle_id UUID;
  os_family_id UUID;
  db_family_id UUID;
BEGIN
  -- Get the OS tech family ID (assuming it exists)
  SELECT id INTO os_family_id FROM "TechFam" WHERE name = 'Operating Systems' LIMIT 1;
  
  -- If no OS family exists, get any tech family
  IF os_family_id IS NULL THEN
    SELECT id INTO os_family_id FROM "TechFam" LIMIT 1;
  END IF;
  
  -- Get the Database tech family ID
  SELECT id INTO db_family_id FROM "TechFam" WHERE name = 'Databases' LIMIT 1;
  
  -- If no Database family exists, use the same as OS family
  IF db_family_id IS NULL THEN
    db_family_id := os_family_id;
  END IF;
  
  -- Check if 'Windows 10' exists, if not insert it
  SELECT id INTO win10_id FROM "Tech" WHERE name = 'Windows 10';
  IF win10_id IS NULL THEN
    INSERT INTO "Tech" (name, "techFamId") VALUES ('Windows 10', os_family_id) RETURNING id INTO win10_id;
  END IF;
  
  -- Check if 'Linux' exists, if not insert it
  SELECT id INTO linux_id FROM "Tech" WHERE name = 'Linux';
  IF linux_id IS NULL THEN
    INSERT INTO "Tech" (name, "techFamId") VALUES ('Linux', os_family_id) RETURNING id INTO linux_id;
  END IF;
  
  -- Check if 'Microsoft SQL Server' exists, if not insert it
  SELECT id INTO mssql_id FROM "Tech" WHERE name = 'Microsoft SQL Server';
  IF mssql_id IS NULL THEN
    INSERT INTO "Tech" (name, "techFamId") VALUES ('Microsoft SQL Server', db_family_id) RETURNING id INTO mssql_id;
  END IF;
  
  -- Check if 'Oracle Database' exists, if not insert it
  SELECT id INTO oracle_id FROM "Tech" WHERE name = 'Oracle Database';
  IF oracle_id IS NULL THEN
    INSERT INTO "Tech" (name, "techFamId") VALUES ('Oracle Database', db_family_id) RETURNING id INTO oracle_id;
  END IF;
  
  -- Now insert controls with the correct UUIDs (if they don't exist already)
  
  -- Windows 10 Controls
  INSERT INTO "Controls" (id, "controlFamily", "controlType", description, statement, "monitorID", recommendation, "THR_code", comments, "techId")
  VALUES
  ('WIN10-001', 'Account Management', 'Configuration', 'Password Policy', 'Windows 10 systems must enforce password complexity requirements.', 'MON-WIN-001', 'Configure password policy to require complex passwords.', 'win_password_policy:
  complexity: true
  min_length: 12
  history: 24', 'Critical for compliance with NIST 800-53', win10_id)
  ON CONFLICT (id) DO NOTHING;
  
  -- Add more controls as needed
END $$;
