import React, { useState, useEffect } from "react";
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
import { Search, Loader2 } from "lucide-react";
import { useTechnologies, TechFam, Tech } from "@/hooks/useTechnologies";

interface TechnologySelectorProps {
  onFamilyChange?: (familyId: string, familyName: string) => void;
  onTechnologyChange?: (techId: string, techName: string) => void;
  onSearchChange?: (searchTerm: string) => void;
  initialFamilyId?: string;
  initialTechId?: string;
}

const TechnologySelector = ({
  onFamilyChange = () => {},
  onTechnologyChange = () => {},
  onSearchChange = () => {},
  initialFamilyId,
  initialTechId,
}: TechnologySelectorProps) => {
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(
    initialFamilyId || null,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { techFamilies, technologies, loading, error, fetchTechnologies } =
    useTechnologies();

  // Set default family when data is loaded
  useEffect(() => {
    if (techFamilies.length > 0 && !selectedFamilyId) {
      const firstFamily = techFamilies[0];
      setSelectedFamilyId(firstFamily.id);
      onFamilyChange(firstFamily.id, firstFamily.title);
      fetchTechnologies(firstFamily.id);
    } else if (selectedFamilyId) {
      // If we already have a selected family ID, fetch its technologies
      fetchTechnologies(selectedFamilyId);
    }
  }, [techFamilies, selectedFamilyId]);

  // Initialize with initial tech ID if provided
  useEffect(() => {
    if (initialTechId && technologies.length > 0) {
      const tech = technologies.find((t) => t.id === initialTechId);
      if (tech) {
        onTechnologyChange(tech.id, tech.title);
      }
    }
  }, [initialTechId, technologies]);

  const handleFamilyChange = (value: string) => {
    console.log("TechnologySelector - Family selected:", value);
    setSelectedFamilyId(value);
    const family = techFamilies.find((f) => f.id === value);
    if (family) {
      console.log("TechnologySelector - Found family:", family);
      onFamilyChange(family.id, family.title);
      fetchTechnologies(family.id);
    }
  };

  const handleTechnologyChange = (value: string) => {
    console.log("TechnologySelector - Technology value selected:", value);
    const tech = technologies.find((t) => t.id === value);
    if (tech) {
      console.log("TechnologySelector - Found technology:", tech);
      onTechnologyChange(tech.id, tech.title);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange(e.target.value);
  };

  if (loading && techFamilies.length === 0) {
    return (
      <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Loading technology data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-red-200 text-red-600">
        Error loading technology data. Please try again.
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-background p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <Tabs
            value={selectedFamilyId || undefined}
            onValueChange={handleFamilyChange}
            className="w-full"
          >
            <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex md:flex-row">
              {techFamilies.map((family) => (
                <TabsTrigger key={family.id} value={family.id}>
                  {family.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:items-center">
          <Select onValueChange={handleTechnologyChange}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Select technology" />
            </SelectTrigger>
            <SelectContent>
              {technologies.map((tech) => (
                <SelectItem key={tech.id} value={tech.id}>
                  {tech.title}
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
