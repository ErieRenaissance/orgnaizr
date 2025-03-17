import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { type Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) throw new Error('Missing VITE_SUPABASE_URL');
if (!supabaseAnonKey) throw new Error('Missing VITE_SUPABASE_ANON_KEY');

// Create a singleton instance
const supabase = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);

export const createClient = () => supabase;

export type AuthError = {
  message: string;
  status: number;
};