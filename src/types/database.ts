export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = 'user' | 'admin' | 'super_admin';

export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: AppRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Section = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  section_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Book = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  author: string | null;
  cover_image_url: string | null;
  cover_storage_path: string | null;
  file_url: string | null;
  file_storage_path: string | null;
  category_id: string | null;
  section_id: string | null;
  file_size: number | null;
  file_type: string | null;
  is_published: boolean;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type Media = {
  id: string;
  title: string | null;
  description: string | null;
  storage_path: string;
  public_url: string | null;
  mime_type: string | null;
  file_size: number | null;
  width: number | null;
  height: number | null;
  section_id: string | null;
  category_id: string | null;
  uploaded_by: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: AppRole;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: AppRole;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: any[];
      };
      sections: {
        Row: Section;
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: any[];
      };
      categories: {
        Row: Category;
        Insert: {
          id?: string;
          section_id: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: any[];
      };
      books: {
        Row: Book;
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          author?: string | null;
          cover_image_url?: string | null;
          cover_storage_path?: string | null;
          file_url?: string | null;
          file_storage_path?: string | null;
          category_id?: string | null;
          section_id?: string | null;
          file_size?: number | null;
          file_type?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          author?: string | null;
          cover_image_url?: string | null;
          cover_storage_path?: string | null;
          file_url?: string | null;
          file_storage_path?: string | null;
          category_id?: string | null;
          section_id?: string | null;
          file_size?: number | null;
          file_type?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: any[];
      };
      media: {
        Row: Media;
        Insert: {
          id?: string;
          title?: string | null;
          description?: string | null;
          storage_path: string;
          public_url?: string | null;
          mime_type?: string | null;
          file_size?: number | null;
          width?: number | null;
          height?: number | null;
          section_id?: string | null;
          category_id?: string | null;
          uploaded_by?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string | null;
          description?: string | null;
          storage_path?: string;
          public_url?: string | null;
          mime_type?: string | null;
          file_size?: number | null;
          width?: number | null;
          height?: number | null;
          section_id?: string | null;
          category_id?: string | null;
          uploaded_by?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: any[];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_my_role: {
        Args: Record<string, unknown>;
        Returns: AppRole;
      };
      is_admin: {
        Args: Record<string, unknown>;
        Returns: boolean;
      };
      is_super_admin: {
        Args: Record<string, unknown>;
        Returns: boolean;
      };
      get_user_role_by_id: {
        Args: {
          user_id: string;
        };
        Returns: AppRole;
      };
      get_user_is_active_by_id: {
        Args: {
          user_id: string;
        };
        Returns: boolean;
      };
      set_user_role: {
        Args: {
          target_user_id: string;
          new_role: AppRole;
        };
        Returns: void;
      };
    };
    Enums: {
      app_role: AppRole;
    };
    CompositeTypes: Record<string, never>;
  };
};
