import { createClient } from '@supabase/supabase-js'

let supabase: ReturnType<typeof createClient> | null = null;

// Inicializa o cliente Supabase apenas no lado do cliente
if (typeof window !== 'undefined') {
  supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export { supabase } 