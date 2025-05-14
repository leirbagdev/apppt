import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  console.log(`[Middleware] Executando para: ${req.nextUrl.pathname}`);

  try {
    // Log das variáveis de ambiente (apenas para depuração, considere remover logs de chaves em produção)
    console.log('[Middleware] Verificando variáveis de ambiente...');
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('[Middleware] Erro: NEXT_PUBLIC_SUPABASE_URL não está definida.');
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('[Middleware] Erro: NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida.');
    }

    // Criar cliente Supabase usando a API do SSR
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return req.cookies.get(name)?.value
          },
          set(name, value, options) {
            req.cookies.set({
              name,
              value,
              ...options,
            })
            res.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name, options) {
            req.cookies.set({
              name,
              value: '',
              ...options,
            })
            res.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )
    console.log('[Middleware] Cliente Supabase criado.');
    
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('[Middleware] Erro ao buscar sessão Supabase:', sessionError.message);
      // Decide-se não lançar erro aqui, mas logar. O fluxo continua,
      // e a ausência de sessão será tratada abaixo.
    } else {
      console.log('[Middleware] Sessão Supabase obtida:', session ? 'Sessão ativa' : 'Nenhuma sessão');
    }

    // Se estiver na página inicial, não redirecione
    if (req.nextUrl.pathname === '/') {
      console.log('[Middleware] Rota é /, permitindo acesso.');
      return res
    }

    // Se estiver tentando acessar páginas protegidas sem estar logado
    if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
      console.log('[Middleware] Sem sessão e tentando acessar /dashboard. Redirecionando para /login.');
      return NextResponse.redirect(new URL('/login', req.url))
    }

    console.log('[Middleware] Concluído. Retornando resposta.');
    return res
  } catch (e: any) {
    console.error('[Middleware] Erro inesperado no middleware:', e.message, e.stack);
    // Retornar uma resposta de erro para evitar quebrar a aplicação
    // Em desenvolvimento, pode ser útil ver o erro, mas em produção, uma página de erro genérica é melhor.
    return new NextResponse(
      JSON.stringify({ error: 'Erro interno no servidor durante o middleware.' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login'],
} 