import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import EditControlForm from "./EditControlForm";
import ControlsTableUI from "./ControlsTableUI";
import { useControls, Control } from "@/hooks/useControls";

interface ControlsTableProps {
  techFamId?: string;
  techId?: string;
  searchTerm?: string;
}

const ControlsTable: React.FC<ControlsTableProps> = ({
  techFamId,
  techId,
  searchTerm,
}) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [editingControl, setEditingControl] = useState<Control | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof Control | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Use the custom hook to fetch controls from Supabase
  const { controls, loading, error, saveControl, fetchControls } = useControls({
    techFamId,
    techId,
    searchTerm,
    sortColumn: sortColumn || undefined,
    sortDirection,
  });

  const handleSort = (column: keyof Control) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const handleRowClick = (control: Control) => {
    setEditingControl(control);
  };

  const handleExpandRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleSave = async (updatedControl: Control) => {
    const success = await saveControl(updatedControl);
    if (success) {
      setEditingControl(null);
    }
  };

  const handleCancel = () => {
    setEditingControl(null);
  };

  if (loading && controls.length === 0) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading controls...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
        Error: {error}
      </div>
    );
  }

  if (controls.length === 0 && !loading) {
    return (
      <div className="w-full p-4 bg-gray-50 text-gray-600 rounded-md border border-gray-200 text-center">
        {!techId
          ? "Please select a technology to view controls."
          : "No controls found. Try adjusting your filters or adding new controls."}
      </div>
    );
  }

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
        <ControlsTableUI
          controls={controls}
          expandedRow={expandedRow}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onRowClick={handleRowClick}
          onExpandRow={handleExpandRow}
          onSort={handleSort}
        />
      )}
    </div>
  );
};

export default ControlsTable;
