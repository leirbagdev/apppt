-- Criar schema privado se não existir
CREATE SCHEMA IF NOT EXISTS private;

-- Criar tabela de perfis (se não existir)
CREATE TABLE IF NOT EXISTS private.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'trainer' CHECK (role IN ('trainer', 'student', 'admin')),
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de alunos (se não existir)
CREATE TABLE IF NOT EXISTS private.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trainer_id UUID REFERENCES private.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  birth_date DATE,
  avatar_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  plan TEXT DEFAULT 'basic' CHECK (plan IN ('basic', 'standard', 'premium')),
  start_date DATE DEFAULT CURRENT_DATE,
  emergency_contact TEXT,
  emergency_phone TEXT,
  height DECIMAL(5,2),
  weight DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de exercícios (se não existir)
CREATE TABLE IF NOT EXISTS private.exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  muscle_groups TEXT[],
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  created_by UUID REFERENCES private.profiles(id),
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de logs de segurança (se não existir)
CREATE TABLE IF NOT EXISTS private.security_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level TEXT NOT NULL CHECK (level IN ('info', 'warn', 'error')),
  event TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}',
  user_id UUID REFERENCES auth.users(id),
  ip TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS para todas as tabelas
ALTER TABLE private.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.security_logs ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Usuários podem ver seus próprios perfis" ON private.profiles;
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios perfis" ON private.profiles;
DROP POLICY IF EXISTS "Treinadores podem ver seus alunos" ON private.students;
DROP POLICY IF EXISTS "Treinadores podem gerenciar seus alunos" ON private.students;
DROP POLICY IF EXISTS "Ver exercícios públicos ou próprios" ON private.exercises;
DROP POLICY IF EXISTS "Gerenciar próprios exercícios" ON private.exercises;
DROP POLICY IF EXISTS "Apenas admins podem ver logs" ON private.security_logs;

-- Criar novas políticas RLS
CREATE POLICY "Usuários podem ver seus próprios perfis" ON private.profiles
FOR SELECT TO authenticated
USING (auth.uid() = id OR EXISTS (
  SELECT 1 FROM private.profiles WHERE id = auth.uid() AND role = 'admin'
));

CREATE POLICY "Usuários podem atualizar seus próprios perfis" ON private.profiles
FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Treinadores podem ver seus alunos" ON private.students
FOR SELECT TO authenticated
USING (
  trainer_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM private.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Treinadores podem gerenciar seus alunos" ON private.students
FOR ALL TO authenticated
USING (
  trainer_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM private.profiles WHERE id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  trainer_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM private.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Ver exercícios públicos ou próprios" ON private.exercises
FOR SELECT TO authenticated
USING (is_public OR created_by = auth.uid());

CREATE POLICY "Gerenciar próprios exercícios" ON private.exercises
FOR ALL TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Apenas admins podem ver logs" ON private.security_logs
FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM private.profiles 
  WHERE id = auth.uid() AND role = 'admin'
));

-- Criar função para atualização automática de updated_at
CREATE OR REPLACE FUNCTION private.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar triggers para atualização automática
DROP TRIGGER IF EXISTS set_updated_at ON private.profiles;
DROP TRIGGER IF EXISTS set_updated_at ON private.students;
DROP TRIGGER IF EXISTS set_updated_at ON private.exercises;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON private.profiles
  FOR EACH ROW
  EXECUTE FUNCTION private.set_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON private.students
  FOR EACH ROW
  EXECUTE FUNCTION private.set_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON private.exercises
  FOR EACH ROW
  EXECUTE FUNCTION private.set_updated_at();
