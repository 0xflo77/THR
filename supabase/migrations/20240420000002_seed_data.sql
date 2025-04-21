-- Seed TechFam data
INSERT INTO "TechFam" ("id", "title") VALUES
  ('f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Operating Systems'),
  ('e9a45d7b-5e1a-4a76-9a39-4f21f5c3d2e7', 'Databases'),
  ('c7b2de8a-9f12-4b3c-8d67-5c3a9f0a4e1b', 'Network Devices');

-- Seed Tech data
INSERT INTO "Tech" ("id", "techfam_id", "title") VALUES
  -- Operating Systems
  ('a1b2c3d4-e5f6-4a5b-9c3d-2e1f0a9b8c7d', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Windows 10'),
  ('b2c3d4e5-f6a7-5b6c-0d1e-3f2f0a9b8c7d', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Linux'),
  ('c3d4e5f6-a7b8-6c7d-1e2f-4f5e0a9b8c7d', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'macOS'),
  
  -- Databases
  ('d4e5f6a7-b8c9-7d8e-2f3f-5e6d0a9b8c7d', 'e9a45d7b-5e1a-4a76-9a39-4f21f5c3d2e7', 'Microsoft SQL Server'),
  ('e5f6a7b8-c9d0-8e9f-3f4e-6d7c0a9b8c7d', 'e9a45d7b-5e1a-4a76-9a39-4f21f5c3d2e7', 'Oracle Database'),
  ('f6a7b8c9-d0e1-9f0a-4f5e-7d6c0a9b8c7d', 'e9a45d7b-5e1a-4a76-9a39-4f21f5c3d2e7', 'PostgreSQL'),
  
  -- Network Devices
  ('a7b8c9d0-e1f2-0a1b-5f6e-8d7c0a9b8c7d', 'c7b2de8a-9f12-4b3c-8d67-5c3a9f0a4e1b', 'Cisco Routers'),
  ('b8c9d0e1-f2a3-1b2c-6f7e-9d8c0a9b8c7d', 'c7b2de8a-9f12-4b3c-8d67-5c3a9f0a4e1b', 'Juniper Switches'),
  ('c9d0e1f2-a3b4-2c3d-7f8e-0d9c0a9b8c7d', 'c7b2de8a-9f12-4b3c-8d67-5c3a9f0a4e1b', 'Palo Alto Firewalls');

-- Seed Controls data
INSERT INTO "Controls" ("id", "tech_id", "techfam_id", "controlFamily", "controlType", "ranking", "description", "statement", "recommendation", "THR_code", "comments") VALUES
  -- Windows 10 Controls
  ('WIN10-001', 'a1b2c3d4-e5f6-4a5b-9c3d-2e1f0a9b8c7d', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Account Management', 'Configuration', 1, 'Password Policy', 'Windows 10 systems must enforce password complexity requirements.', 'Configure password policy to require complex passwords.', 'win_password_policy:\\n  complexity: true\\n  min_length: 12\\n  history: 24', 'Critical for compliance with NIST 800-53'),
  ('WIN10-002', 'a1b2c3d4-e5f6-4a5b-9c3d-2e1f0a9b8c7d', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Access Control', 'Configuration', 2, 'Account Lockout', 'Windows 10 systems must implement account lockout for failed logon attempts.', 'Configure account lockout policy to lock accounts after 3 failed attempts.', 'win_account_lockout:\\n  threshold: 3\\n  duration: 30\\n  reset_counter: 15', 'Required for PCI-DSS compliance'),
  ('WIN10-003', 'a1b2c3d4-e5f6-4a5b-9c3d-2e1f0a9b8c7d', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Audit and Accountability', 'Configuration', 3, 'Audit Logging', 'Windows 10 systems must be configured to generate audit records.', 'Enable audit logging for system events, logon events, and object access.', 'win_audit_policy:\\n  system_events: success,failure\\n  logon_events: success,failure\\n  object_access: success,failure', 'Verify logs are being collected centrally'),
  
  -- Linux Controls
  ('LNX-001', 'b2c3d4e5-f6a7-5b6c-0d1e-3f2f0a9b8c7d', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Account Management', 'Configuration', 1, 'Password Policy', 'Linux systems must enforce password complexity requirements.', 'Configure PAM and password quality requirements.', 'linux_pam_config:\\n  password_quality:\\n    minlen: 12\\n    dcredit: -1\\n    ucredit: -1\\n    lcredit: -1\\n    ocredit: -1', 'Implement via /etc/security/pwquality.conf'),
  ('LNX-002', 'b2c3d4e5-f6a7-5b6c-0d1e-3f2f0a9b8c7d', 'f8c3de3d-1fea-4d7c-a8b0-29f63c4c3454', 'Access Control', 'Configuration', 2, 'SSH Configuration', 'Linux systems must properly configure SSH for secure remote access.', 'Configure SSH to use only secure protocols and authentication methods.', 'linux_ssh_config:\\n  protocol: 2\\n  permit_root_login: no\\n  password_authentication: no\\n  x11_forwarding: no', 'Implement in /etc/ssh/sshd_config'),
  
  -- SQL Server Controls
  ('MSSQL-001', 'd4e5f6a7-b8c9-7d8e-2f3f-5e6d0a9b8c7d', 'e9a45d7b-5e1a-4a76-9a39-4f21f5c3d2e7', 'Access Control', 'Configuration', 1, 'Authentication', 'SQL Server must be configured to use Windows Authentication.', 'Configure SQL Server to use Windows Authentication mode.', 'mssql_auth:\\n  mode: windows\\n  sa_account: disabled', 'Mixed mode should be avoided if possible'),
  ('MSSQL-002', 'd4e5f6a7-b8c9-7d8e-2f3f-5e6d0a9b8c7d', 'e9a45d7b-5e1a-4a76-9a39-4f21f5c3d2e7', 'Audit and Accountability', 'Configuration', 2, 'Audit Logging', 'SQL Server must be configured to generate audit records.', 'Enable SQL Server Audit for all security-relevant events.', 'mssql_audit:\\n  server_audit_spec: enabled\\n  database_audit_spec: enabled\\n  events:\\n    - FAILED_LOGIN_GROUP\\n    - SUCCESSFUL_LOGIN_GROUP\\n    - DATABASE_OBJECT_ACCESS_GROUP', 'Store audit logs for at least 90 days'),
  
  -- Oracle Database Controls
  ('ORA-001', 'e5f6a7b8-c9d0-8e9f-3f4e-6d7c0a9b8c7d', 'e9a45d7b-5e1a-4a76-9a39-4f21f5c3d2e7', 'Access Control', 'Configuration', 1, 'Authentication', 'Oracle Database must be configured to use strong authentication mechanisms.', 'Configure Oracle Database to use multi-factor authentication where possible.', 'oracle_auth:\\n  profile: DEFAULT\\n  password_verify_function: ora12c_verify_function\\n  failed_login_attempts: 3', 'Consider Oracle Advanced Security options'),
  ('ORA-002', 'e5f6a7b8-c9d0-8e9f-3f4e-6d7c0a9b8c7d', 'e9a45d7b-5e1a-4a76-9a39-4f21f5c3d2e7', 'Audit and Accountability', 'Configuration', 2, 'Audit Logging', 'Oracle Database must be configured to generate audit records.', 'Enable and configure Oracle Database auditing.', 'oracle_audit:\\n  unified_auditing: enabled\\n  policies:\\n    - ORA_SECURECONFIG\\n    - ORA_LOGON_FAILURES\\n    - ORA_DATABASE_PARAMETER', 'Configure audit vault for centralized management'),
  
  -- Cisco Routers Controls
  ('CISCO-001', 'a7b8c9d0-e1f2-0a1b-5f6e-8d7c0a9b8c7d', 'c7b2de8a-9f12-4b3c-8d67-5c3a9f0a4e1b', 'Access Control', 'Configuration', 1, 'Authentication', 'Cisco routers must use strong authentication for administrative access.', 'Configure AAA authentication using TACACS+ or RADIUS.', 'cisco_auth:\\n  aaa_new_model: true\\n  authentication:\\n    login:\\n      default: group tacacs+ local\\n    enable:\\n      default: group tacacs+ enable', 'Ensure fallback to local authentication'),
  ('CISCO-002', 'a7b8c9d0-e1f2-0a1b-5f6e-8d7c0a9b8c7d', 'c7b2de8a-9f12-4b3c-8d67-5c3a9f0a4e1b', 'System and Communications Protection', 'Configuration', 2, 'Secure Management', 'Cisco routers must be configured for secure management access.', 'Configure SSH and disable Telnet for device management.', 'cisco_management:\\n  ssh:\\n    version: 2\\n    timeout: 60\\n  line_vty:\\n    transport:\\n      input: ssh\\n      output: ssh', 'Disable all unused management protocols');