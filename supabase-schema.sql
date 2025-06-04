-- Criar tabela de estudantes
CREATE TABLE students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Dados pessoais
  full_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  secondary_phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  emergency_contact TEXT NOT NULL,
  emergency_phone TEXT NOT NULL,
  
  -- Dados físicos
  height INTEGER NOT NULL, -- em cm
  weight DECIMAL(5,2) NOT NULL, -- em kg
  body_fat DECIMAL(4,1),
  
  -- Objetivos e saúde
  objectives TEXT[] NOT NULL DEFAULT '{}',
  medical_restrictions TEXT,
  medications TEXT,
  injuries TEXT,
  experience_level TEXT NOT NULL CHECK (experience_level IN ('iniciante', 'intermediario', 'avancado', 'atleta')),
  
  -- Wearable
  wearable_device TEXT,
  wearable_id TEXT,
  
  -- Plano
  plan TEXT NOT NULL CHECK (plan IN ('basic', 'standard', 'premium', 'vip')),
  frequency INTEGER NOT NULL CHECK (frequency >= 1 AND frequency <= 7),
  start_date DATE NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('credit', 'debit', 'pix', 'transfer', 'cash')),
  observations TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
  avatar_url TEXT
);

-- Criar tabela de treinos
CREATE TABLE workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  schedule TEXT NOT NULL,
  exercises JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled'))
);

-- Criar índices para performance
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_plan ON students(plan);
CREATE INDEX idx_students_created_at ON students(created_at);
CREATE INDEX idx_workouts_student_id ON workouts(student_id);
CREATE INDEX idx_workouts_status ON workouts(status);

-- Habilitar RLS (Row Level Security)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança (permitir tudo por enquanto - ajustar conforme necessário)
CREATE POLICY "Allow all operations on students" ON students FOR ALL USING (true);
CREATE POLICY "Allow all operations on workouts" ON workouts FOR ALL USING (true);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON workouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
