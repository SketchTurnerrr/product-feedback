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
      "product-feedback-requests": {
        Row: {
          category: string | null
          comments: Json | null
          created_at: string
          detail: string | null
          downvotes: number | null
          id: string
          title: string | null
          update_status: string | null
          upvotes: number | null
          user_id: string
        }
        Insert: {
          category?: string | null
          comments?: Json | null
          created_at?: string
          detail?: string | null
          downvotes?: number | null
          id?: string
          title?: string | null
          update_status?: string | null
          upvotes?: number | null
          user_id: string
        }
        Update: {
          category?: string | null
          comments?: Json | null
          created_at?: string
          detail?: string | null
          downvotes?: number | null
          id?: string
          title?: string | null
          update_status?: string | null
          upvotes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product-feedback-requests_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string
          id: string
          name: string
        }
        Insert: {
          avatar_url: string
          id: string
          name: string
        }
        Update: {
          avatar_url?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
