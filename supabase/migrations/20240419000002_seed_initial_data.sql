-- Seed data for TechFam table
INSERT INTO "TechFam" ("name") VALUES
('OS'),
('Database'),
('Platforms'),
('Network')
ON CONFLICT ("id") DO NOTHING;

-- Seed data for Yech table
-- We'll insert with hardcoded UUIDs to ensure consistent references
WITH tech_fams AS (
  SELECT * FROM "TechFam"
)
INSERT INTO "Yech" ("name", "techFamId")
SELECT 'Windows 11', tf.id FROM tech_fams tf WHERE tf.name = 'OS'
UNION ALL
SELECT 'Ubuntu 22.04', tf.id FROM tech_fams tf WHERE tf.name = 'OS'
UNION ALL
SELECT 'SQL Server', tf.id FROM tech_fams tf WHERE tf.name = 'Database'
UNION ALL
SELECT 'MySQL', tf.id FROM tech_fams tf WHERE tf.name = 'Database'
UNION ALL
SELECT 'AWS', tf.id FROM tech_fams tf WHERE tf.name = 'Platforms'
UNION ALL
SELECT 'Azure', tf.id FROM tech_fams tf WHERE tf.name = 'Platforms'
ON CONFLICT ("id") DO NOTHING;

-- Seed sample Controls data
WITH techs AS (
  SELECT * FROM "Yech"
)
INSERT INTO "Controls" ("id", "controlFamily", "controlType", "description", "statement", "monitorID", "recommendation", "THR_code", "comments", "techId")
SELECT 
  'WIN-001', 'Access Control', 'Technical', 'Windows Password Policy', 
  'Password policies must be configured to require complexity', 
  'M-WIN-001', 'Configure password policy to require minimum 12 characters with complexity', 
  'THR-WIN-001', 'Critical for compliance', 
  t.id
FROM techs t WHERE t.name = 'Windows 11'
UNION ALL
SELECT 
  'WIN-002', 'System Hardening', 'Technical', 'Windows Update Configuration', 
  'Automatic updates must be enabled and configured', 
  'M-WIN-002', 'Configure Windows Update to automatically download and install updates', 
  'THR-WIN-002', 'Ensures timely security patches', 
  t.id
FROM techs t WHERE t.name = 'Windows 11'
UNION ALL
SELECT 
  'SQL-001', 'Authentication', 'Technical', 'SQL Server Authentication', 
  'SQL Authentication must use Windows Authentication mode where possible', 
  'M-SQL-001', 'Configure SQL Server to use Windows Authentication mode', 
  'THR-SQL-001', 'Reduces attack surface', 
  t.id
FROM techs t WHERE t.name = 'SQL Server'
UNION ALL
SELECT 
  'SQL-002', 'Data Protection', 'Technical', 'SQL Server Encryption', 
  'Transparent Data Encryption (TDE) must be enabled for all production databases', 
  'M-SQL-002', 'Enable TDE for all production databases', 
  'THR-SQL-002', 'Protects data at rest', 
  t.id
FROM techs t WHERE t.name = 'SQL Server'
UNION ALL
SELECT 
  'MYSQL-001', 'Authentication', 'Technical', 'MySQL Authentication', 
  'MySQL must use strong password policies and authentication plugins', 
  'M-MYSQL-001', 'Configure MySQL to use strong password validation plugin', 
  'THR-MYSQL-001', 'Prevents weak passwords', 
  t.id
FROM techs t WHERE t.name = 'MySQL'
UNION ALL
SELECT 
  'MYSQL-002', 'Data Protection', 'Technical', 'MySQL Encryption', 
  'Data-at-rest encryption must be enabled for sensitive MySQL databases', 
  'M-MYSQL-002', 'Enable MySQL Enterprise TDE or filesystem encryption', 
  'THR-MYSQL-002', 'Protects sensitive data', 
  t.id
FROM techs t WHERE t.name = 'MySQL'
ON CONFLICT ("id") DO NOTHING;