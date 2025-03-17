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
          qr_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          qr_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          qr_code?: string | null
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
          confidence_score?: number | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          content_id: string
          tag_name: string
          created_at: string
        }
        Insert: {
          id?: string
          content_id: string
          tag_name: string
          created_at?: string
        }
        Update: {
          id?: string
          content_id?: string
          tag_name?: string
          created_at?: string
        }
      }
    }
  }
}