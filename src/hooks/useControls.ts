import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database";

export type Control = Database["public"]["Tables"]["Controls"]["Row"];
export type TechFam = Database["public"]["Tables"]["TechFam"]["Row"];
export type Tech = Database["public"]["Tables"]["Tech"]["Row"];

interface UseControlsOptions {
  techfam_id?: string;
  tech_id?: string;
  searchTerm?: string;
  sortColumn?: keyof Control;
  sortDirection?: "asc" | "desc";
}

export function useControls(options: UseControlsOptions = {}) {
  const [controls, setControls] = useState<Control[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchControls = async () => {
    console.log("fetchControls called with options:", options);
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from("Controls").select(`
          *,
          Tech:tech_id(id, title, techfam_id),
          TechFam:techfam_id(id, title)
        `);

      // Apply filters
      if (options.tech_id) {
        console.log("Filtering by tech_id:", options.tech_id);
        query = query.eq("tech_id", options.tech_id);
      } else if (options.techfam_id) {
        console.log("Filtering by techfam_id:", options.techfam_id);
        query = query.eq("techfam_id", options.techfam_id);
      }

      // Apply search
      if (options.searchTerm) {
        query = query.or(
          `id.ilike.%${options.searchTerm}%,statement.ilike.%${options.searchTerm}%,description.ilike.%${options.searchTerm}%`,
        );
      }

      // Apply sorting
      if (options.sortColumn) {
        query = query.order(options.sortColumn, {
          ascending: options.sortDirection === "asc",
        });
      } else {
        // Default sorting by ranking if available, otherwise by id
        query = query
          .order("ranking", { ascending: true, nullsFirst: false })
          .order("id");
      }

      // Add pagination for lazy loading
      const pageSize = 50; // Load 50 records at a time
      query = query.range(0, pageSize - 1);

      const { data, error } = await query;

      if (error) throw error;
      setControls(data || []);
    } catch (err) {
      console.error("Error fetching controls:", err);
      setError("Failed to fetch controls");
    } finally {
      setLoading(false);
    }
  };

  const saveControl = async (control: Partial<Control>) => {
    try {
      setError(null);

      if (control.id) {
        // Update existing control
        const { error } = await supabase
          .from("Controls")
          .update({
            ...control,
            updated_at: new Date().toISOString(),
          })
          .eq("id", control.id);

        if (error) throw error;
      } else {
        // Create new control
        const { error } = await supabase
          .from("Controls")
          .insert(
            control as Database["public"]["Tables"]["Controls"]["Insert"],
          );

        if (error) throw error;
      }

      // Refresh the controls list
      await fetchControls();
      return true;
    } catch (err) {
      console.error("Error saving control:", err);
      setError("Failed to save control");
      return false;
    }
  };

  const deleteControl = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase.from("Controls").delete().eq("id", id);

      if (error) throw error;

      // Refresh the controls list
      await fetchControls();
      return true;
    } catch (err) {
      console.error("Error deleting control:", err);
      setError("Failed to delete control");
      return false;
    }
  };

  // Fetch controls when options change
  useEffect(() => {
    console.log("Fetching controls with options:", options);
    fetchControls();
  }, [
    options.techfam_id,
    options.tech_id,
    options.searchTerm,
    options.sortColumn,
    options.sortDirection,
  ]);

  // For debugging
  useEffect(() => {
    console.log("useControls options changed:", {
      techfam_id: options.techfam_id,
      tech_id: options.tech_id,
      searchTerm: options.searchTerm,
    });
  }, [options.techfam_id, options.tech_id, options.searchTerm]);

  return {
    controls,
    loading,
    error,
    fetchControls,
    saveControl,
    deleteControl,
  };
}
