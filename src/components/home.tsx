import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import TechnologySelector from "./TechnologySelector";
import ControlsTable from "./ControlsTable";

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

const Home = () => {
  const [selectedFamily, setSelectedFamily] = useState<string>("OS");
  const [selectedTechnology, setSelectedTechnology] =
    useState<string>("Windows 11");
  const [controls, setControls] = useState<Control[]>([
    {
      id: "OS-WIN-001",
      controlFamily: "Access Control",
      controlType: "Technical",
      description:
        "Ensure local administrator accounts are disabled or restricted",
      statement:
        "Local administrator accounts must be disabled or restricted to prevent unauthorized access.",
      monitorID: "M-WIN-AC-001",
      recommendation:
        "Use Group Policy to disable local administrator accounts or restrict their use to emergency scenarios only.",
      THR_code: "THR-OS-WIN-AC-001",
      comments: "Critical for preventing privilege escalation attacks.",
    },
    {
      id: "OS-WIN-002",
      controlFamily: "Authentication",
      controlType: "Technical",
      description:
        "Implement multi-factor authentication for all administrative access",
      statement:
        "Multi-factor authentication must be implemented for all administrative access to Windows systems.",
      monitorID: "M-WIN-AU-001",
      recommendation:
        "Configure Windows Hello for Business or integrate with a third-party MFA solution.",
      THR_code: "THR-OS-WIN-AU-001",
      comments: "Reduces risk of credential theft and unauthorized access.",
    },
    {
      id: "OS-WIN-003",
      controlFamily: "Audit and Accountability",
      controlType: "Technical",
      description: "Enable comprehensive audit logging",
      statement:
        "Comprehensive audit logging must be enabled to track all security-relevant events.",
      monitorID: "M-WIN-AA-001",
      recommendation:
        "Configure Windows Event Log settings to capture logon events, privilege use, policy changes, and system events.",
      THR_code: "THR-OS-WIN-AA-001",
      comments: "Essential for incident response and forensic analysis.",
    },
    {
      id: "OS-WIN-004",
      controlFamily: "Configuration Management",
      controlType: "Technical",
      description: "Disable unnecessary services and features",
      statement:
        "All unnecessary services and features must be disabled to reduce attack surface.",
      monitorID: "M-WIN-CM-001",
      recommendation:
        "Use Group Policy to disable unnecessary Windows services and features not required for business operations.",
      THR_code: "THR-OS-WIN-CM-001",
      comments: "Reduces attack surface and potential vulnerabilities.",
    },
    {
      id: "OS-WIN-005",
      controlFamily: "Endpoint Protection",
      controlType: "Technical",
      description: "Deploy and configure Windows Defender",
      statement:
        "Windows Defender must be deployed and properly configured on all Windows systems.",
      monitorID: "M-WIN-EP-001",
      recommendation:
        "Enable real-time protection, cloud-delivered protection, and automatic sample submission.",
      THR_code: "THR-OS-WIN-EP-001",
      comments:
        "Provides baseline protection against malware and other threats.",
    },
  ]);

  const handleFamilyChange = (family: string) => {
    setSelectedFamily(family);
    // In a real application, you would fetch technologies for the selected family
    // and update the selected technology accordingly
    if (family === "OS") {
      setSelectedTechnology("Windows 11");
    } else if (family === "Database") {
      setSelectedTechnology("SQL Server");
    } else {
      setSelectedTechnology("");
    }
  };

  const handleTechnologyChange = (technology: string) => {
    setSelectedTechnology(technology);
    // In a real application, you would fetch controls for the selected technology
  };

  const handleControlUpdate = (updatedControl: Control) => {
    setControls(
      controls.map((control) =>
        control.id === updatedControl.id ? updatedControl : control,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">THR Registry</h1>
          </motion.div>
          <div className="flex space-x-4">
            <span className="text-slate-300">
              Technical Hardening Requirements Management System
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TechnologySelector
            selectedFamily={selectedFamily}
            selectedTechnology={selectedTechnology}
            onFamilyChange={handleFamilyChange}
            onTechnologyChange={handleTechnologyChange}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
          <ControlsTable
            controls={controls}
            onControlUpdate={handleControlUpdate}
          />
        </motion.div>
      </main>

      <footer className="bg-slate-800 text-slate-300 p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>
            © {new Date().getFullYear()} THR Registry - Technical Hardening
            Requirements Management System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
