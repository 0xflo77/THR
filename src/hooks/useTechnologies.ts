import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database";

export type TechFam = Database["public"]["Tables"]["TechFam"]["Row"];
export type Tech = Database["public"]["Tables"]["Tech"]["Row"];

export function useTechnologies() {
  const [techFamilies, setTechFamilies] = useState<TechFam[]>([]);
  const [technologies, setTechnologies] = useState<Tech[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTechFamilies = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.from("TechFam").select("*");

      if (error) throw error;
      setTechFamilies(data || []);
    } catch (err) {
      console.error("Error fetching tech families:", err);
      setError("Failed to fetch technology families");
    } finally {
      setLoading(false);
    }
  };

  const fetchTechnologies = async (techfam_id?: string) => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from("Tech").select("*");

      if (techfam_id) {
        query = query.eq("techfam_id", techfam_id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTechnologies(data || []);
    } catch (err) {
      console.error("Error fetching technologies:", err);
      setError("Failed to fetch technologies");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tech families on initial load
  useEffect(() => {
    fetchTechFamilies();
  }, []);

  return {
    techFamilies,
    technologies,
    loading,
    error,
    fetchTechFamilies,
    fetchTechnologies,
  };
}
