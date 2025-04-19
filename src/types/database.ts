export interface Database {
  public: {
    Tables: {
      Controls: {
        Row: {
          id: string;
          controlFamily: string;
          controlType: string;
          description: string;
          statement: string;
          monitorID: string;
          recommendation: string;
          THR_code: string;
          comments: string;
          techId: string;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id: string;
          controlFamily: string;
          controlType: string;
          description: string;
          statement: string;
          monitorID: string;
          recommendation: string;
          THR_code: string;
          comments?: string;
          techId: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          controlFamily?: string;
          controlType?: string;
          description?: string;
          statement?: string;
          monitorID?: string;
          recommendation?: string;
          THR_code?: string;
          comments?: string;
          techId?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      TechFam: {
        Row: {
          id: string;
          name: string;
          created_at?: string;
        };
        Insert: {
          id: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
        };
      };
      Tech: {
        Row: {
          id: string;
          name: string;
          techFamId: string;
          created_at?: string;
        };
        Insert: {
          id: string;
          name: string;
          techFamId: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          techFamId?: string;
          created_at?: string;
        };
      };
    };
  };
}
