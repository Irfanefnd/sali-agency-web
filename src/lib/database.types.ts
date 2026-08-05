export type ServiceRow = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  duration: string | null;
  price_from: string | null;
  card_type: "visa" | "legal" | "lifestyle";
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type ApplicationRow = {
  id: number;
  service_id: number | null;
  tracking_code: string;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  nationality: string | null;
  status: "pending" | "in_review" | "approved" | "rejected" | "completed";
  current_stage: string | null;
  estimated_completion_date: string | null;
  notes: string | null;
  created_at: string;
};

export type ApplicationEventRow = {
  id: number;
  application_id: number;
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "completed";
  is_visible_to_client: boolean;
  created_at: string;
};

export type LeadRow = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  service_interest: string | null;
  message: string | null;
  status: "new" | "contacted" | "converted" | "closed";
  created_at: string;
};

export type ArticleRow = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_img: string | null;
  category: string | null;
  author: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type SettingRow = {
  key: string;
  value: string | null;
  updated_at: string;
};

export interface Database {
  public: {
    Tables: {
      services: {
        Row: ServiceRow;
        Insert: Partial<ServiceRow>;
        Update: Partial<ServiceRow>;
        Relationships: [];
      };
      applications: {
        Row: ApplicationRow;
        Insert: Partial<ApplicationRow>;
        Update: Partial<ApplicationRow>;
        Relationships: [
          {
            foreignKeyName: "applications_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      application_events: {
        Row: ApplicationEventRow;
        Insert: Partial<ApplicationEventRow>;
        Update: Partial<ApplicationEventRow>;
        Relationships: [
          {
            foreignKeyName: "application_events_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: false;
            referencedRelation: "applications";
            referencedColumns: ["id"];
          },
        ];
      };
      leads: {
        Row: LeadRow;
        Insert: Partial<LeadRow>;
        Update: Partial<LeadRow>;
        Relationships: [];
      };
      articles: {
        Row: ArticleRow;
        Insert: Partial<ArticleRow>;
        Update: Partial<ArticleRow>;
        Relationships: [];
      };
      settings: {
        Row: SettingRow;
        Insert: Partial<SettingRow>;
        Update: Partial<SettingRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
