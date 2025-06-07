-- Extensão para gerar UUIDs
create extension if not exists "uuid-ossp";

-- Tabela de logs de segurança
create table if not exists security_logs (
  id uuid primary key default uuid_generate_v4(),
  level text not null check (level in ('info', 'warn', 'error')),
  event text not null,
  details jsonb not null default '{}',
  user_id uuid references auth.users(id),
  ip text,
  timestamp timestamptz not null default now()
);

-- Políticas RLS para a tabela de logs
alter table security_logs enable row level security;

-- Apenas administradores podem ler os logs
create policy "Only admins can read security logs" 
  on security_logs for select 
  using (
    auth.uid() in (
      select user_id 
      from users 
      where role = 'admin'
    )
  );
