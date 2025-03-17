export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      containers: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          type: string
          location_id: string | null
          photo_file_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          type: string
          location_id?: string | null
          photo_file_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          type?: string
          location_id?: string | null
          photo_file_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contents: {
        Row: {
          id: string
          container_id: string
          item_name: string
          quantity: number
          category: string
          material: string
          size: string
          color: string
          secondary_color: string | null
          condition: string
          function: string
          fragile: boolean
          brand: string | null
          model: string | null
          confidence_score: number | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          container_id: string
          item_name: string
          quantity?: number
          category: string
          material: string
          size: string
          color: string
          secondary_color?: string | null
          condition: string
          function: string
          fragile?: boolean
          brand?: string | null
          model?: string | null
          confidence_score?: number | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          container_id?: string
          item_name?: string
          quantity?: number
          category?: string
          material?: string
          size?: string
          color?: string
          secondary_color?: string | null
          condition?: string
          function?: string
          fragile?: boolean
          brand?: string | null
          model?: string | null
          confidence_score?: number | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      storage_locations: {
        Row: {
          id: string
          user_id: string
          name: string
          type: string
          details: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: string
          details?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: string
          details?: Json
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          display_name: string | null
          avatar_url: string | null
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          display_name?: string | null
          avatar_url?: string | null
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          display_name?: string | null
          avatar_url?: string | null
          settings?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}