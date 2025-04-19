import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database";

export type Control = Database["public"]["Tables"]["Controls"]["Row"];
export type TechFam = Database["public"]["Tables"]["TechFam"]["Row"];
export type Tech = Database["public"]["Tables"]["Tech"]["Row"];

interface UseControlsOptions {
  techFamId?: string;
  techId?: string;
  searchTerm?: string;
  sortColumn?: keyof Control;
  sortDirection?: "asc" | "desc";
}

export function useControls(options: UseControlsOptions = {}) {
  const [controls, setControls] = useState<Control[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchControls = async () => {
    // Don't fetch if no techId is provided (lazy loading)
    if (!options.techId && !options.searchTerm) {
      setControls([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let query = supabase.from("Controls").select(`
          *,
          Tech:techId(id, name, techFamId, TechFam:techFamId(id, name))
        `);

      // Apply filters
      if (options.techId) {
        query = query.eq("techId", options.techId);
      } else if (options.techFamId) {
        query = query.eq("Tech.techFamId", options.techFamId);
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
    fetchControls();
  }, [
    options.techFamId,
    options.techId,
    options.searchTerm,
    options.sortColumn,
    options.sortDirection,
  ]);

  return {
    controls,
    loading,
    error,
    fetchControls,
    saveControl,
    deleteControl,
  };
}
