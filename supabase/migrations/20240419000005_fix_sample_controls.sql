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
  history: 24', 'Critical for compliance with NIST 800-53', win10_id),
  ('WIN10-002', 'Access Control', 'Configuration', 'Account Lockout', 'Windows 10 systems must implement account lockout for failed logon attempts.', 'MON-WIN-002', 'Configure account lockout policy to lock accounts after 3 failed attempts.', 'win_account_lockout:
  threshold: 3
  duration: 30
  reset_counter: 15', 'Required for PCI-DSS compliance', win10_id),
  ('WIN10-003', 'Audit and Accountability', 'Configuration', 'Audit Logging', 'Windows 10 systems must be configured to generate audit records.', 'MON-WIN-003', 'Enable audit logging for system events, logon events, and object access.', 'win_audit_policy:
  system_events: success,failure
  logon_events: success,failure
  object_access: success,failure', 'Verify logs are being collected centrally', win10_id),
  ('WIN10-004', 'System and Communications Protection', 'Configuration', 'Firewall Settings', 'Windows 10 systems must enable and properly configure the host-based firewall.', 'MON-WIN-004', 'Enable Windows Defender Firewall and configure appropriate rules.', 'win_firewall:
  state: enabled
  inbound_default: block
  outbound_default: allow', 'Exceptions should be documented and approved', win10_id),
  ('WIN10-005', 'System and Information Integrity', 'Configuration', 'Malware Protection', 'Windows 10 systems must implement antivirus and anti-malware solutions.', 'MON-WIN-005', 'Install and configure Windows Defender or approved third-party solution.', 'win_defender:
  real_time_protection: enabled
  cloud_protection: enabled
  sample_submission: disabled', 'Regular scans should be scheduled', win10_id)
  ON CONFLICT (id) DO NOTHING;
  
  -- Linux Controls
  INSERT INTO "Controls" (id, "controlFamily", "controlType", description, statement, "monitorID", recommendation, "THR_code", comments, "techId")
  VALUES
  ('LNX-001', 'Account Management', 'Configuration', 'Password Policy', 'Linux systems must enforce password complexity requirements.', 'MON-LNX-001', 'Configure PAM and password quality requirements.', 'linux_pam_config:
  password_quality:
    minlen: 12
    dcredit: -1
    ucredit: -1
    lcredit: -1
    ocredit: -1', 'Implement via /etc/security/pwquality.conf', linux_id),
  ('LNX-002', 'Access Control', 'Configuration', 'SSH Configuration', 'Linux systems must properly configure SSH for secure remote access.', 'MON-LNX-002', 'Configure SSH to use only secure protocols and authentication methods.', 'linux_ssh_config:
  protocol: 2
  permit_root_login: no
  password_authentication: no
  x11_forwarding: no', 'Implement in /etc/ssh/sshd_config', linux_id),
  ('LNX-003', 'Audit and Accountability', 'Configuration', 'Audit Logging', 'Linux systems must be configured to generate audit records.', 'MON-LNX-003', 'Configure auditd to capture authentication, authorization, and system events.', 'linux_audit_rules:
  auth_events: enabled
  system_calls: enabled
  file_access: enabled', 'Forward logs to central SIEM', linux_id),
  ('LNX-004', 'System and Communications Protection', 'Configuration', 'Firewall Settings', 'Linux systems must enable and properly configure the host-based firewall.', 'MON-LNX-004', 'Configure iptables or firewalld with appropriate rules.', 'linux_firewall:
  service: firewalld
  state: running
  default_zone: public
  inbound_policy: deny', 'Document all allowed services', linux_id),
  ('LNX-005', 'System and Information Integrity', 'Configuration', 'File Integrity', 'Linux systems must implement file integrity monitoring.', 'MON-LNX-005', 'Install and configure AIDE or other file integrity monitoring solution.', 'linux_file_integrity:
  tool: aide
  schedule: daily
  directories:
    - /etc
    - /bin
    - /sbin', 'Review reports daily', linux_id)
  ON CONFLICT (id) DO NOTHING;
  
  -- SQL Server Controls
  INSERT INTO "Controls" (id, "controlFamily", "controlType", description, statement, "monitorID", recommendation, "THR_code", comments, "techId")
  VALUES
  ('MSSQL-001', 'Access Control', 'Configuration', 'Authentication', 'SQL Server must be configured to use Windows Authentication.', 'MON-MSSQL-001', 'Configure SQL Server to use Windows Authentication mode.', 'mssql_auth:
  mode: windows
  sa_account: disabled', 'Mixed mode should be avoided if possible', mssql_id),
  ('MSSQL-002', 'Audit and Accountability', 'Configuration', 'Audit Logging', 'SQL Server must be configured to generate audit records.', 'MON-MSSQL-002', 'Enable SQL Server Audit for all security-relevant events.', 'mssql_audit:
  server_audit_spec: enabled
  database_audit_spec: enabled
  events:
    - FAILED_LOGIN_GROUP
    - SUCCESSFUL_LOGIN_GROUP
    - DATABASE_OBJECT_ACCESS_GROUP', 'Store audit logs for at least 90 days', mssql_id),
  ('MSSQL-003', 'Configuration Management', 'Configuration', 'Surface Area Reduction', 'SQL Server must disable unnecessary features and services.', 'MON-MSSQL-003', 'Disable unused features and services to reduce attack surface.', 'mssql_features:
  xp_cmdshell: disabled
  ole_automation: disabled
  clr: disabled
  remote_access: disabled', 'Document any exceptions with business justification', mssql_id),
  ('MSSQL-004', 'System and Communications Protection', 'Configuration', 'Encryption', 'SQL Server must encrypt sensitive data.', 'MON-MSSQL-004', 'Implement Transparent Data Encryption (TDE) for all databases containing sensitive data.', 'mssql_encryption:
  tde: enabled
  certificates:
    rotation: 90_days
    backup: required', 'Ensure proper key management', mssql_id),
  ('MSSQL-005', 'Identification and Authentication', 'Configuration', 'Password Policy', 'SQL Server must enforce password policies for SQL authentication.', 'MON-MSSQL-005', 'Enable and configure SQL Server password policy enforcement.', 'mssql_password_policy:
  check_policy: enabled
  check_expiration: enabled
  complexity: enabled
  min_length: 12', 'Apply to all SQL logins', mssql_id)
  ON CONFLICT (id) DO NOTHING;
  
  -- Oracle Database Controls
  INSERT INTO "Controls" (id, "controlFamily", "controlType", description, statement, "monitorID", recommendation, "THR_code", comments, "techId")
  VALUES
  ('ORA-001', 'Access Control', 'Configuration', 'Authentication', 'Oracle Database must be configured to use strong authentication mechanisms.', 'MON-ORA-001', 'Configure Oracle Database to use multi-factor authentication where possible.', 'oracle_auth:
  profile: DEFAULT
  password_verify_function: ora12c_verify_function
  failed_login_attempts: 3', 'Consider Oracle Advanced Security options', oracle_id),
  ('ORA-002', 'Audit and Accountability', 'Configuration', 'Audit Logging', 'Oracle Database must be configured to generate audit records.', 'MON-ORA-002', 'Enable and configure Oracle Database auditing.', 'oracle_audit:
  unified_auditing: enabled
  policies:
    - ORA_SECURECONFIG
    - ORA_LOGON_FAILURES
    - ORA_DATABASE_PARAMETER', 'Configure audit vault for centralized management', oracle_id),
  ('ORA-003', 'Configuration Management', 'Configuration', 'Default Accounts', 'Oracle Database must secure or disable default accounts.', 'MON-ORA-003', 'Lock and expire all default accounts that are not required.', 'oracle_accounts:
  default_accounts: locked
  exceptions:
    - SYS
    - SYSTEM', 'Document any exceptions with business justification', oracle_id),
  ('ORA-004', 'System and Communications Protection', 'Configuration', 'Encryption', 'Oracle Database must encrypt sensitive data.', 'MON-ORA-004', 'Implement Transparent Data Encryption (TDE) for all tablespaces containing sensitive data.', 'oracle_encryption:
  tde: enabled
  algorithm: AES256
  key_management:
    rotation: 90_days
    backup: required', 'Use Oracle Key Vault if available', oracle_id),
  ('ORA-005', 'System and Information Integrity', 'Configuration', 'Patch Management', 'Oracle Database must be kept up-to-date with security patches.', 'MON-ORA-005', 'Apply Critical Patch Updates (CPUs) within 30 days of release.', 'oracle_patching:
  cpu_schedule: quarterly
  max_delay: 30_days
  testing: required
  documentation: required', 'Use Oracle Enterprise Manager for patch management', oracle_id)
  ON CONFLICT (id) DO NOTHING;
  
END $$;
