import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env
// The user should set these in a .env file or in their deployment environment (Vercel)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wrtoakhtijykfpiypacg.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY_HERE';

export const supabase = createClient(supabaseUrl, supabaseKey);
