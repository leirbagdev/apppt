import { createBrowserClient } from '@supabase/ssr'

// Inicializa o cliente Supabase para uso no lado do cliente (navegador)
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export { supabase } 