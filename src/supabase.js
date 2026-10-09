import { createClient } from '@supabase/supabase-js'

// The publishable key is meant for the browser; what it may do is limited by the row level security policies in Supabase
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
)
