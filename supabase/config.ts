import { createBrowserClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Create a browser client for client-side operations
export const createClient = () => {
  // Use standard browser client 
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
};

// Create a direct client for server-side operations
export const createServerClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
