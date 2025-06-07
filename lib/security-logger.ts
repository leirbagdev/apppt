import { supabaseAdmin } from './supabase-clients';

export enum SecurityLogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface SecurityLogEntry {
  level: SecurityLogLevel;
  event: string;
  details: Record<string, any>;
  userId?: string;
  timestamp: string;
  ip?: string;
}

export async function logSecurityEvent(
  level: SecurityLogLevel,
  event: string,
  details: Record<string, any>,
  userId?: string,
  ip?: string
) {
  const logEntry: SecurityLogEntry = {
    level,
    event,
    details,
    userId,
    ip,
    timestamp: new Date().toISOString(),
  };

  // Log para console em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('[Security Log]', logEntry);
  }

  // Log para Supabase em produção
  if (process.env.NODE_ENV === 'production' && supabaseAdmin) {
    try {
      await supabaseAdmin
        .from('security_logs')
        .insert(logEntry);
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }
}
