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

    const { pathname } = req.nextUrl;

    // Usuário logado tentando acessar /login ou / (landing page)
    if (session && (pathname === '/login' || pathname === '/')) {
      console.log(`[Middleware] Usuário logado acessando ${pathname}. Redirecionando para /dashboard.`);
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Usuário não logado tentando acessar /dashboard
    if (!session && pathname.startsWith('/dashboard')) {
      console.log('[Middleware] Sem sessão e tentando acessar /dashboard. Redirecionando para /login.');
      return NextResponse.redirect(new URL('/login', req.url));
    }
    
    // Se nenhuma das condições acima for atendida (ex: usuário logado acessando /dashboard, ou não logado acessando /login ou /),
    // permite o acesso.
    console.log(`[Middleware] Permitindo acesso para ${pathname}. Sessão: ${session ? 'ativa' : 'inativa'}`);
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