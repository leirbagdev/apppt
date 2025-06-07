import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const rateLimit = {
  windowMs: 60 * 1000, // 1 minuto
  max: 60 // limite de requisições por janela
};

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function rateLimiter(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const key = `rate-limit:${ip}`;

  let requests = await redis.incr(key);
  
  if (requests === 1) {
    await redis.expire(key, rateLimit.windowMs / 1000);
  }

  if (requests > rateLimit.max) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  return null;
}
