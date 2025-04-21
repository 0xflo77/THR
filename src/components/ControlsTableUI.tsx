import React from "react";
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
import { Control } from "@/hooks/useControls";

interface ControlsTableUIProps {
  controls: Control[];
  expandedRow: string | null;
  sortColumn: keyof Control | null;
  sortDirection: "asc" | "desc";
  onRowClick: (control: Control) => void;
  onExpandRow: (id: string, e: React.MouseEvent) => void;
  onSort: (column: keyof Control) => void;
}

const ControlsTableUI: React.FC<ControlsTableUIProps> = ({
  controls,
  expandedRow,
  sortColumn,
  sortDirection,
  onRowClick,
  onExpandRow,
  onSort,
}) => {
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
    <div className="rounded-md border shadow-sm overflow-hidden">
      <div className="max-h-[70vh] overflow-y-auto scrollbar-thin">
        <Table className="min-w-[1200px] w-full">
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead className="w-16" onClick={() => onSort("id")}>
                <div className="flex items-center cursor-pointer">
                  ID {renderSortIcon("id")}
                </div>
              </TableHead>
              <TableHead
                className="w-[180px]"
                onClick={() => onSort("controlFamily")}
              >
                <div className="flex items-center cursor-pointer">
                  Control Family {renderSortIcon("controlFamily")}
                </div>
              </TableHead>
              <TableHead
                className="w-[120px]"
                onClick={() => onSort("controlType")}
              >
                <div className="flex items-center cursor-pointer">
                  Type {renderSortIcon("controlType")}
                </div>
              </TableHead>
              <TableHead
                className="w-[400px]"
                onClick={() => onSort("statement")}
              >
                <div className="flex items-center cursor-pointer">
                  Statement {renderSortIcon("statement")}
                </div>
              </TableHead>
              <TableHead
                className="w-[200px]"
                onClick={() => onSort("THR_code")}
              >
                <div className="flex items-center cursor-pointer">
                  THR Code {renderSortIcon("THR_code")}
                </div>
              </TableHead>
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {controls.map((control) => (
              <React.Fragment key={control.id}>
                <TableRow
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onRowClick(control)}
                >
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => onExpandRow(control.id, e)}
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
                  <TableCell className="max-w-[400px]">
                    {truncateText(control.statement, 150)}
                  </TableCell>
                  <TableCell className="max-w-[200px] font-mono text-xs">
                    {truncateText(control.THR_code, 30)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick(control);
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
                          <h4 className="font-semibold mb-1">Recommendation</h4>
                          <div className="text-sm whitespace-pre-line max-h-60 overflow-y-auto pr-2">
                            {control.recommendation}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Ranking</h4>
                          <p className="text-sm">
                            {control.ranking || "Not ranked"}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">THR Code</h4>
                          <pre className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-x-auto h-24 scrollbar-thin whitespace-pre-wrap">
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
    </div>
  );
};

export default ControlsTableUI;
