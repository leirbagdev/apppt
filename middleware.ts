import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimiter } from './lib/rate-limiter';
import { logSecurityEvent, SecurityLogLevel } from './lib/security-logger';

export async function middleware(request: NextRequest) {
  // Apenas aplicar em rotas da API
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Verificar rate limit
    const rateLimitResult = await rateLimiter(request);
    if (rateLimitResult) {
      await logSecurityEvent(
        SecurityLogLevel.WARN,
        'rate_limit_exceeded',
        {
          path: request.nextUrl.pathname,
          method: request.method,
        },
        undefined,
        request.ip
      );
      return rateLimitResult;
    }

    // Verificar token de autenticação para rotas protegidas
    if (request.nextUrl.pathname.startsWith('/api/protected')) {
      const authHeader = request.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        await logSecurityEvent(
          SecurityLogLevel.WARN,
          'unauthorized_access_attempt',
          {
            path: request.nextUrl.pathname,
            method: request.method,
          },
          undefined,
          request.ip
        );
        
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
}
