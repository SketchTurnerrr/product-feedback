export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          content: string;
          created_at: string;
          feedback_id: string;
          id: string;
          parent_comment_id: string | null;
          profile_id: string;
          replies: string[] | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          feedback_id: string;
          id?: string;
          parent_comment_id?: string | null;
          profile_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          feedback_id?: string;
          id?: string;
          parent_comment_id?: string | null;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_feedback_id_fkey';
            columns: ['feedback_id'];
            referencedRelation: 'product-feedback-requests';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_parent_comment_id_fkey';
            columns: ['parent_comment_id'];
            referencedRelation: 'comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_profile_id_fkey';
            columns: ['profile_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      'product-feedback-requests': {
        Row: {
          category: string | null;
          created_at: string;
          detail: string | null;
          id: string;
          status: string;
          title: string;
          user_id: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          detail?: string | null;
          id?: string;
          status: string;
          title?: string;
          user_id: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          detail?: string | null;
          id?: string;
          status?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'product-feedback-requests_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string;
          id: string;
          name: string;
        };
        Insert: {
          avatar_url: string;
          id: string;
          name: string;
        };
        Update: {
          avatar_url?: string;
          id?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      upvotes: {
        Row: {
          created_at: string;
          feedback_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          feedback_id: string;
          id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          feedback_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'upvotes_feedback_id_fkey';
            columns: ['feedback_id'];
            referencedRelation: 'product-feedback-requests';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'upvotes_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
