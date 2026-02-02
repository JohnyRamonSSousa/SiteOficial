import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Only throw in development/production if critical, but for now we warn
  console.warn('Missing Supabase environment variables! Check .env.local');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
