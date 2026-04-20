import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Browser / client-side Supabase client.
 * Singleton pattern — re-used across components.
 */
export const supabase = createClient(supabaseUrl, supabaseAnon)
