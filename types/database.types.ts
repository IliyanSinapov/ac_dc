export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_information: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          avatar_image: string;
          relative_avatar_path: string;
          cart_id: string;

        };
        insert: {
          user_id: string;
          username: string;
        };
        Update: {
          username: string;
        };
      };
      cart: {
        id: string;
        products: any[];
      }
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
