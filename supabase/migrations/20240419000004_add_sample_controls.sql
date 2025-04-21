-- Add sample controls for each Tech

-- First, ensure we have the necessary Tech entries with valid UUIDs
DO $$ 
DECLARE
  win10_id UUID;
  linux_id UUID;
  mssql_id UUID;
  oracle_id UUID;
BEGIN
  -- Check if 'Windows 10' exists, if not insert it
  SELECT id INTO win10_id FROM "Tech" WHERE name = 'Windows 10';
  IF win10_id IS NULL THEN
    -- Get a valid TechFam ID (assuming OS family exists)
    DECLARE os_family_id UUID;
    SELECT id INTO os_family_id FROM "TechFam" WHERE name = 'Operating Systems' LIMIT 1;
    
    -- If no OS family exists, create one
    IF os_family_id IS NULL THEN
      INSERT INTO "TechFam" (name) VALUES ('Operating Systems') RETURNING id INTO os_family_id;
    END IF;
    
    -- Insert Windows 10
    INSERT INTO "Tech" (name, "techFamId") VALUES ('Windows 10', os_family_id) RETURNING id INTO win10_id;
  END IF;
  
  -- Check if 'Linux' exists, if not insert it
  SELECT id INTO linux_id FROM "Tech" WHERE name = 'Linux';
  IF linux_id IS NULL THEN
    -- Get a valid TechFam ID (assuming OS family exists)
    DECLARE os_family_id UUID;
    SELECT id INTO os_family_id FROM "TechFam" WHERE name = 'Operating Systems' LIMIT 1;
    
    -- Insert Linux
    INSERT INTO "Tech" (name, "techFamId") VALUES ('Linux', os_family_id) RETURNING id INTO linux_id;
  END IF;
  
  -- Check if 'Microsoft SQL Server' exists, if not insert it
  SELECT id INTO mssql_id FROM "Tech" WHERE name = 'Microsoft SQL Server';
  IF mssql_id IS NULL THEN
    -- Get a valid TechFam ID (assuming Database family exists)
    DECLARE db_family_id UUID;
    SELECT id INTO db_family_id FROM "TechFam" WHERE name = 'Databases' LIMIT 1;
    
    -- If no Database family exists, create one
    IF db_family_id IS NULL THEN
      INSERT INTO "TechFam" (name) VALUES ('Databases') RETURNING id INTO db_family_id;
    END IF;
    
    -- Insert Microsoft SQL Server
    INSERT INTO "Tech" (name, "techFamId") VALUES ('Microsoft SQL Server', db_family_id) RETURNING id INTO mssql_id;
  END IF;
  
  -- Check if 'Oracle Database' exists, if not insert it
  SELECT id INTO oracle_id FROM "Tech" WHERE name = 'Oracle Database';
  IF oracle_id IS NULL THEN
    -- Get a valid TechFam ID (assuming Database family exists)
    DECLARE db_family_id UUID;
    SELECT id INTO db_family_id FROM "TechFam" WHERE name = 'Databases' LIMIT 1;
    
    -- Insert Oracle Database
    INSERT INTO "Tech" (name, "techFamId") VALUES ('Oracle Database', db_family_id) RETURNING id INTO oracle_id;
  END IF;
  
  -- Now insert controls with the correct UUIDs
  
  -- Windows 10 Controls
  INSERT INTO "Controls" (id, "controlFamily", "controlType", description, statement, "monitorID", recommendation, "THR_code", comments, "techId")
  VALUES
  ('WIN10-001', 'Account Management', 'Configuration', 'Password Policy', 'Windows 10 systems must enforce password complexity requirements.', 'MON-WIN-001', 'Configure password policy to require complex passwords.', 'win_password_policy:
  complexity: true
  min_length: 12
  history: 24', 'Critical for compliance with NIST 800-53', win10_id)
  ON CONFLICT (id) DO NOTHING;
  
  -- Add more Windows controls here...
  
  -- Linux Controls
  INSERT INTO "Controls" (id, "controlFamily", "controlType", description, statement, "monitorID", recommendation, "THR_code", comments, "techId")
  VALUES
  ('LNX-001', 'Account Management', 'Configuration', 'Password Policy', 'Linux systems must enforce password complexity requirements.', 'MON-LNX-001', 'Configure PAM and password quality requirements.', 'linux_pam_config:
  password_quality:
    minlen: 12
    dcredit: -1
    ucredit: -1
    lcredit: -1
    ocredit: -1', 'Implement via /etc/security/pwquality.conf', linux_id)
  ON CONFLICT (id) DO NOTHING;
  
  -- Add more Linux controls here...
  
  -- SQL Server Controls
  INSERT INTO "Controls" (id, "controlFamily", "controlType", description, statement, "monitorID", recommendation, "THR_code", comments, "techId")
  VALUES
  ('MSSQL-001', 'Access Control', 'Configuration', 'Authentication', 'SQL Server must be configured to use Windows Authentication.', 'MON-MSSQL-001', 'Configure SQL Server to use Windows Authentication mode.', 'mssql_auth:
  mode: windows
  sa_account: disabled', 'Mixed mode should be avoided if possible', mssql_id)
  ON CONFLICT (id) DO NOTHING;
  
  -- Add more SQL Server controls here...
  
  -- Oracle Database Controls
  INSERT INTO "Controls" (id, "controlFamily", "controlType", description, statement, "monitorID", recommendation, "THR_code", comments, "techId")
  VALUES
  ('ORA-001', 'Access Control', 'Configuration', 'Authentication', 'Oracle Database must be configured to use strong authentication mechanisms.', 'MON-ORA-001', 'Configure Oracle Database to use multi-factor authentication where possible.', 'oracle_auth:
  profile: DEFAULT
  password_verify_function: ora12c_verify_function
  failed_login_attempts: 3', 'Consider Oracle Advanced Security options', oracle_id)
  ON CONFLICT (id) DO NOTHING;
  
  -- Add more Oracle controls here...
  
END $$;
