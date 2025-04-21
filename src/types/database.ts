export interface Database {
  public: {
    Tables: {
      Controls: {
        Row: {
          id: string;
          tech_id: string;
          techfam_id: string;
          controlFamily: string;
          controlType: string;
          ranking: number | null;
          description: string;
          statement: string;
          recommendation: string;
          THR_code: string;
          comments: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id: string;
          tech_id: string;
          techfam_id: string;
          controlFamily: string;
          controlType: string;
          ranking?: number | null;
          description: string;
          statement: string;
          recommendation: string;
          THR_code: string;
          comments?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          tech_id?: string;
          techfam_id?: string;
          controlFamily?: string;
          controlType?: string;
          ranking?: number | null;
          description?: string;
          statement?: string;
          recommendation?: string;
          THR_code?: string;
          comments?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      TechFam: {
        Row: {
          id: string;
          title: string;
          created_at?: string;
        };
        Insert: {
          id?: string;
          title: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          created_at?: string;
        };
      };
      Tech: {
        Row: {
          id: string;
          techfam_id: string;
          title: string;
          created_at?: string;
        };
        Insert: {
          id?: string;
          techfam_id: string;
          title: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          techfam_id?: string;
          title?: string;
          created_at?: string;
        };
      };
    };
  };
}
