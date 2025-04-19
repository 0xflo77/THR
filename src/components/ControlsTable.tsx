import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Filter,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import EditControlForm from "./EditControlForm";

interface Control {
  id: string;
  controlFamily: string;
  controlType: string;
  description: string;
  statement: string;
  monitorID: string;
  recommendation: string;
  THR_code: string;
  comments: string;
}

interface ControlsTableProps {
  controls?: Control[];
  onSave?: (control: Control) => void;
  onSort?: (column: keyof Control, direction: "asc" | "desc") => void;
  onFilter?: (column: keyof Control, value: string) => void;
}

const ControlsTable: React.FC<ControlsTableProps> = ({
  controls = mockControls,
  onSave = () => {},
  onSort = () => {},
  onFilter = () => {},
}) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [editingControl, setEditingControl] = useState<Control | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof Control | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof Control) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    onSort(column, newDirection);
  };

  const handleRowClick = (control: Control) => {
    setEditingControl(control);
  };

  const handleExpandRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleSave = (updatedControl: Control) => {
    onSave(updatedControl);
    setEditingControl(null);
  };

  const handleCancel = () => {
    setEditingControl(null);
  };

  const renderSortIcon = (column: keyof Control) => {
    if (sortColumn !== column)
      return <Filter className="ml-1 h-4 w-4 text-gray-400" />;
    return sortDirection === "asc" ? (
      <SortAsc className="ml-1 h-4 w-4 text-primary" />
    ) : (
      <SortDesc className="ml-1 h-4 w-4 text-primary" />
    );
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="w-full bg-background">
      {editingControl ? (
        <Card className="p-6 shadow-md">
          <EditControlForm
            control={editingControl}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </Card>
      ) : (
        <div className="rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead className="w-20" onClick={() => handleSort("id")}>
                  <div className="flex items-center cursor-pointer">
                    ID {renderSortIcon("id")}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("controlFamily")}>
                  <div className="flex items-center cursor-pointer">
                    Control Family {renderSortIcon("controlFamily")}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("controlType")}>
                  <div className="flex items-center cursor-pointer">
                    Type {renderSortIcon("controlType")}
                  </div>
                </TableHead>
                <TableHead
                  className="w-1/3"
                  onClick={() => handleSort("statement")}
                >
                  <div className="flex items-center cursor-pointer">
                    Statement {renderSortIcon("statement")}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort("THR_code")}>
                  <div className="flex items-center cursor-pointer">
                    THR Code {renderSortIcon("THR_code")}
                  </div>
                </TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {controls.map((control) => (
                <React.Fragment key={control.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(control)}
                  >
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleExpandRow(control.id, e)}
                      >
                        {expandedRow === control.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{control.id}</TableCell>
                    <TableCell>{control.controlFamily}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{control.controlType}</Badge>
                    </TableCell>
                    <TableCell>
                      {truncateText(control.statement, 150)}
                    </TableCell>
                    <TableCell>{control.THR_code}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(control);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedRow === control.id && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={7} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-1">Description</h4>
                            <p className="text-sm whitespace-pre-line">
                              {control.description}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">
                              Recommendation
                            </h4>
                            <div className="text-sm whitespace-pre-line max-h-60 overflow-y-auto pr-2">
                              {control.recommendation}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Monitor ID</h4>
                            <p className="text-sm">{control.monitorID}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">THR Code</h4>
                            <pre className="text-xs bg-slate-100 p-2 rounded overflow-x-auto">
                              {control.THR_code}
                            </pre>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Comments</h4>
                            <div className="text-sm whitespace-pre-line max-h-60 overflow-y-auto pr-2">
                              {control.comments}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

// Mock data for development and preview
const mockControls: Control[] = [
  {
    id: "OS-WIN-001",
    controlFamily: "Access Control",
    controlType: "Configuration",
    description:
      "Ensure local administrator accounts are disabled or strictly controlled",
    statement:
      "Local administrator accounts must be disabled or strictly controlled to prevent unauthorized access and privilege escalation.\n\nThis control helps prevent lateral movement within the network and reduces the risk of credential theft attacks.",
    monitorID: "M-WIN-AC-001",
    recommendation:
      "Use Group Policy to disable the built-in Administrator account and create individual administrative accounts with proper logging enabled.\n\nImplement Just-In-Time (JIT) access for administrative privileges.\n\nEnsure all administrative actions are logged and monitored.\n\nImplement a Privileged Access Management (PAM) solution to control and audit administrative access.\n\nRegularly review and rotate administrative credentials according to organizational policy.",
    THR_code:
      "---\nname: disable_local_admin\nplatform: windows\ntype: group_policy\nsettings:\n  - policy: 'Computer Configuration\\Windows Settings\\Security Settings\\Local Policies\\User Rights Assignment'\n    setting: 'Deny log on locally'\n    value: 'Administrator'\n  - policy: 'Computer Configuration\\Windows Settings\\Security Settings\\Local Policies\\Security Options'\n    setting: 'Accounts: Administrator account status'\n    value: 'Disabled'\n",
    comments:
      "Critical for preventing privilege escalation attacks. Regular audits of administrative accounts should be performed.\n\nThis control addresses multiple compliance requirements including NIST SP 800-53 AC-6, CIS Controls v8 5.4, and ISO 27001 A.9.2.3.\n\nImplementation should be coordinated with the IT operations team to ensure emergency access procedures are in place.",
  },
  {
    id: "OS-WIN-002",
    controlFamily: "Authentication",
    controlType: "Policy",
    description: "Implement multi-factor authentication for all remote access",
    statement:
      "Multi-factor authentication must be implemented for all remote access to Windows systems, including VPN, RDP, and other remote management tools. This provides an additional layer of security beyond passwords alone.",
    monitorID: "M-WIN-AU-002",
    recommendation:
      "Configure Windows Hello for Business or integrate with a third-party MFA solution.\n\nEnsure that all remote access methods require at least two authentication factors.\n\nImplement conditional access policies based on user risk, device compliance, and location.\n\nRegularly review MFA logs for failed authentication attempts and unusual patterns.\n\nProvide user training on proper MFA procedures and how to report suspicious authentication requests.",
    THR_code:
      "---\nname: enforce_mfa_rdp\nplatform: windows\ntype: group_policy\nsettings:\n  - policy: 'Computer Configuration\\Administrative Templates\\Windows Components\\Remote Desktop Services\\Remote Desktop Session Host\\Security'\n    setting: 'Require user authentication for remote connections by using Network Level Authentication'\n    value: 'Enabled'\n  - policy: 'Computer Configuration\\Administrative Templates\\System\\Credentials Delegation'\n    setting: 'Remote host allows delegation of non-exportable credentials'\n    value: 'Enabled'\n",
    comments:
      "Exceptions should be documented and approved by security leadership.\n\nThis control addresses NIST SP 800-53 IA-2(1), CIS Controls v8 6.5, and PCI DSS 8.3.\n\nConsider implementing a phased approach, starting with administrative accounts and gradually expanding to all users.",
  },
  {
    id: "OS-WIN-003",
    controlFamily: "Audit and Accountability",
    controlType: "Monitoring",
    description:
      "Enable comprehensive audit logging for security-relevant events",
    statement:
      "Comprehensive audit logging must be enabled for all security-relevant events, including logon attempts, privilege use, policy changes, and system events. Proper logging is essential for incident detection, response, and forensic analysis.",
    monitorID: "M-WIN-AA-003",
    recommendation:
      "Configure Windows Advanced Audit Policy to capture all security-relevant events.\n\nEnsure logs are forwarded to a central SIEM solution for analysis and retention.\n\nImplement log rotation and archiving to manage storage requirements.\n\nEstablish automated alerting for critical security events.\n\nRegularly review and test the logging configuration to ensure all required events are being captured.\n\nImplement log integrity controls to prevent tampering with audit records.",
    THR_code:
      "---\nname: configure_audit_policy\nplatform: windows\ntype: auditpol\nsettings:\n  - category: 'Account Logon'\n    subcategory: 'Credential Validation'\n    setting: 'Success and Failure'\n  - category: 'Account Management'\n    subcategory: 'User Account Management'\n    setting: 'Success and Failure'\n  - category: 'Detailed Tracking'\n    subcategory: 'Process Creation'\n    setting: 'Success'\n  - category: 'Privilege Use'\n    subcategory: 'Sensitive Privilege Use'\n    setting: 'Success and Failure'\n",
    comments:
      "Log retention period should align with organizational policy and compliance requirements.\n\nThis control addresses NIST SP 800-53 AU-2, CIS Controls v8 8.5, and ISO 27001 A.12.4.1.\n\nConsider the performance impact of extensive logging on system resources and network bandwidth.",
  },
  {
    id: "DB-SQL-001",
    controlFamily: "Data Protection",
    controlType: "Encryption",
    description:
      "Implement Transparent Data Encryption (TDE) for all production databases",
    statement:
      "Transparent Data Encryption (TDE) must be implemented for all production SQL Server databases to protect data at rest. This ensures that database files, including backups, are encrypted to prevent unauthorized access to sensitive data.",
    monitorID: "M-SQL-DP-001",
    recommendation:
      "Enable TDE on all production databases using SQL Server Management Studio or T-SQL commands.\n\nImplement a secure key management solution for TDE certificates and keys.\n\nRegularly rotate encryption keys according to organizational policy.\n\nEnsure backup and recovery procedures account for encrypted databases.\n\nDocument the encryption implementation and key management procedures.\n\nTest performance impact in a non-production environment before implementing in production.",
    THR_code:
      "---\nname: enable_tde_sql_server\nplatform: mssql\ntype: tsql\ncommands:\n  - USE master;\n  - CREATE MASTER KEY ENCRYPTION BY PASSWORD = '{{complex_password}}';\n  - CREATE CERTIFICATE TDECertificate WITH SUBJECT = 'TDE Certificate';\n  - USE {{database_name}};\n  - CREATE DATABASE ENCRYPTION KEY WITH ALGORITHM = AES_256 ENCRYPTION BY SERVER CERTIFICATE TDECertificate;\n  - ALTER DATABASE {{database_name}} SET ENCRYPTION ON;\n",
    comments:
      "Performance impact should be evaluated before implementing in high-transaction environments.\n\nThis control addresses NIST SP 800-53 SC-28, CIS Controls v8 3.11, PCI DSS 3.4, and HIPAA Security Rule.\n\nConsider implementing column-level encryption for particularly sensitive data fields in addition to TDE.",
  },
  {
    id: "DB-SQL-002",
    controlFamily: "Access Control",
    controlType: "Configuration",
    description:
      "Implement least privilege access for database users and roles",
    statement:
      "Database users and roles must be configured with the minimum privileges necessary to perform their required functions. Excessive permissions increase the risk of data breaches and unauthorized data manipulation.",
    monitorID: "M-SQL-AC-002",
    recommendation:
      "Review and remove unnecessary permissions from database users and roles.\n\nImplement custom database roles based on job functions rather than using built-in roles.\n\nRegularly audit user permissions and role memberships.\n\nImplement a formal access request and approval process for database permissions.\n\nUse dynamic data masking and row-level security for sensitive data when appropriate.\n\nImplement just-in-time privileged access for database administrators.\n\nRegularly review and remove orphaned users and unused permissions.",
    THR_code:
      "---\nname: sql_server_least_privilege\nplatform: mssql\ntype: tsql\ncommands:\n  - USE [master];\n  - SELECT dp.name AS principal_name, dp.type_desc AS principal_type, o.name AS object_name, p.permission_name, p.state_desc AS permission_state\n    FROM sys.database_permissions p\n    JOIN sys.database_principals dp ON p.grantee_principal_id = dp.principal_id\n    JOIN sys.objects o ON p.major_id = o.object_id\n    WHERE dp.name NOT IN ('public', 'dbo', 'guest', 'sys', 'INFORMATION_SCHEMA')\n    ORDER BY dp.name, o.name, p.permission_name;\n",
    comments:
      "Quarterly reviews of database permissions should be conducted and documented.\n\nThis control addresses NIST SP 800-53 AC-6, CIS Controls v8 6.8, and ISO 27001 A.9.2.3.\n\nConsider implementing a database activity monitoring solution to detect anomalous access patterns.",
  },
  {
    id: "DB-MYSQL-001",
    controlFamily: "Authentication",
    controlType: "Configuration",
    description: "Implement strong password policies for MySQL database users",
    statement:
      "Strong password policies must be implemented for all MySQL database users to prevent unauthorized access. This includes password complexity, expiration, and reuse restrictions.",
    monitorID: "M-MYSQL-AU-001",
    recommendation:
      "Configure the validate_password plugin to enforce password complexity requirements.\n\nSet password expiration policies using the default_password_lifetime system variable.\n\nDisable the mysql_native_password authentication plugin and use caching_sha2_password instead.\n\nImplement password history policies to prevent password reuse.\n\nConsider implementing multi-factor authentication for database administrators.\n\nRegularly audit password policies and user compliance.",
    THR_code:
      "---\nname: mysql_password_policy\nplatform: mysql\ntype: sql\ncommands:\n  - INSTALL PLUGIN validate_password SONAME 'validate_password.so';\n  - SET GLOBAL validate_password.policy = 'STRONG';\n  - SET GLOBAL validate_password.length = 12;\n  - SET GLOBAL validate_password.mixed_case_count = 1;\n  - SET GLOBAL validate_password.number_count = 1;\n  - SET GLOBAL validate_password.special_char_count = 1;\n  - SET GLOBAL default_password_lifetime = 90;\n",
    comments:
      "This control should be implemented in conjunction with other authentication controls.\n\nThis control addresses NIST SP 800-53 IA-5, CIS Controls v8 5.2, and PCI DSS 8.2.\n\nConsider the operational impact of password expiration policies on application accounts and service accounts.",
  },
  {
    id: "DB-MYSQL-002",
    controlFamily: "Network Security",
    controlType: "Configuration",
    description: "Secure MySQL network configuration and encryption",
    statement:
      "MySQL database connections must be encrypted and network access must be restricted to authorized hosts only. This prevents eavesdropping on database traffic and unauthorized connection attempts.",
    monitorID: "M-MYSQL-NS-002",
    recommendation:
      "Configure MySQL to use TLS/SSL for all connections.\n\nRestrict network access using firewall rules to allow only authorized application servers and administrative workstations.\n\nDisable remote root login.\n\nBind MySQL to listen only on specific interfaces rather than all interfaces.\n\nImplement connection timeout settings to prevent idle connections.\n\nRegularly review and update the list of authorized hosts in the mysql.user table.\n\nConsider implementing a database proxy for additional access control and monitoring.",
    THR_code:
      "---\nname: mysql_network_security\nplatform: mysql\ntype: configuration\nfile: /etc/mysql/my.cnf\nsettings:\n  - section: mysqld\n    options:\n      bind-address: 127.0.0.1\n      require_secure_transport: ON\n      ssl_cert: /path/to/server-cert.pem\n      ssl_key: /path/to/server-key.pem\n      ssl_ca: /path/to/ca-cert.pem\n      max_connect_errors: 10\n      connect_timeout: 10\n",
    comments:
      "Network security should be implemented in layers, with database-level controls complementing network-level controls.\n\nThis control addresses NIST SP 800-53 SC-8, CIS Controls v8 3.10, and PCI DSS 4.1.\n\nConsider the performance impact of SSL/TLS encryption on high-volume database connections.",
  },
  {
    id: "DB-MYSQL-003",
    controlFamily: "Audit and Accountability",
    controlType: "Monitoring",
    description: "Enable comprehensive MySQL audit logging",
    statement:
      "Comprehensive audit logging must be enabled for MySQL databases to track all security-relevant database activities, including schema changes, privilege modifications, and data access patterns.",
    monitorID: "M-MYSQL-AA-003",
    recommendation:
      "Install and configure the MySQL Enterprise Audit plugin or MariaDB Audit Plugin for community edition.\n\nConfigure audit logging to capture login attempts, privilege changes, schema modifications, and data manipulation events.\n\nImplement log rotation and archiving to manage storage requirements.\n\nForward database audit logs to a central SIEM solution for correlation and analysis.\n\nEstablish automated alerting for suspicious database activities.\n\nRegularly review audit logs for unauthorized access attempts and unusual patterns.\n\nImplement log integrity controls to prevent tampering with audit records.",
    THR_code:
      "---\nname: mysql_audit_logging\nplatform: mysql\ntype: sql\ncommands:\n  - INSTALL PLUGIN audit_log SONAME 'audit_log.so';\n  - SET GLOBAL audit_log_format = 'JSON';\n  - SET GLOBAL audit_log_policy = 'ALL';\n  - SET GLOBAL audit_log_rotation_on_size = 104857600;\n  - SET GLOBAL audit_log_rotations = 10;\n",
    comments:
      "Log retention period should align with organizational policy and compliance requirements.\n\nThis control addresses NIST SP 800-53 AU-2, CIS Controls v8 8.5, and ISO 27001 A.12.4.1.\n\nConsider the performance impact of extensive audit logging on system resources and storage requirements.",
  },
];

export default ControlsTable;
