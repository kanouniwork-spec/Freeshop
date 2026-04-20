import { createClient } from '@supabase/supabase-js'

/**
 * Server-side Supabase client (for Server Components / API routes).
 * Uses the service_role key when available (admin actions),
 * falls back to anon key for public reads.
 */
export function createServerSupabaseClient() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY
    ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}
