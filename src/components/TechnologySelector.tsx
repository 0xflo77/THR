import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface TechnologySelectorProps {
  onFamilyChange?: (family: string) => void;
  onTechnologyChange?: (technology: string) => void;
  onSearchChange?: (searchTerm: string) => void;
}

const TechnologySelector = ({
  onFamilyChange = () => {},
  onTechnologyChange = () => {},
  onSearchChange = () => {},
}: TechnologySelectorProps) => {
  const [selectedFamily, setSelectedFamily] = useState("OS");
  const [searchTerm, setSearchTerm] = useState("");

  // Technology options by family
  const technologyOptions = {
    OS: [
      "Windows 11",
      "Windows 10",
      "Windows Server 2019",
      "Ubuntu 22.04",
      "Red Hat Enterprise Linux 9",
      "macOS Ventura",
    ],
    Platforms: [
      "AWS",
      "Azure",
      "Google Cloud Platform",
      "VMware vSphere",
      "Kubernetes",
      "Docker",
    ],
    Database: [
      "SQL Server 2022",
      "Oracle Database 19c",
      "MySQL 8.0",
      "PostgreSQL 15",
      "MongoDB 6.0",
      "MariaDB 10.11",
    ],
    Middleware: [
      "Apache Tomcat",
      "JBoss EAP",
      "WebSphere",
      "WebLogic",
      "Nginx",
      "IIS",
    ],
    Network: [
      "Cisco IOS",
      "Juniper Junos",
      "Palo Alto PAN-OS",
      "F5 BIG-IP",
      "Fortinet FortiOS",
      "Checkpoint",
    ],
    Applications: [
      "Microsoft 365",
      "Salesforce",
      "SAP",
      "Oracle EBS",
      "Workday",
      "ServiceNow",
    ],
  };

  const handleFamilyChange = (value: string) => {
    setSelectedFamily(value);
    onFamilyChange(value);
  };

  const handleTechnologyChange = (value: string) => {
    onTechnologyChange(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <Tabs
            defaultValue={selectedFamily}
            onValueChange={handleFamilyChange}
            className="w-full"
          >
            <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex md:flex-row">
              <TabsTrigger value="OS">OS</TabsTrigger>
              <TabsTrigger value="Platforms">Platforms</TabsTrigger>
              <TabsTrigger value="Database">Database</TabsTrigger>
              <TabsTrigger value="Middleware">Middleware</TabsTrigger>
              <TabsTrigger value="Network">Network</TabsTrigger>
              <TabsTrigger value="Applications">Applications</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:items-center">
          <Select onValueChange={handleTechnologyChange}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Select technology" />
            </SelectTrigger>
            <SelectContent>
              {technologyOptions[
                selectedFamily as keyof typeof technologyOptions
              ]?.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search controls..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-9 w-full md:w-[250px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologySelector;
