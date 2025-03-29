-- Criar tabela de empresas
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  company_id INTEGER REFERENCES companies(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Criar tabela de bancos de dados das empresas
CREATE TABLE IF NOT EXISTS company_databases (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id),
  database_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id),
  UNIQUE(database_name)
);

-- Criar tabela de backups
CREATE TABLE IF NOT EXISTS database_backups (
  id SERIAL PRIMARY KEY,
  database_name VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(database_name, file_name)
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_users_company_id ON users(company_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_companies_email ON companies(email);
CREATE INDEX IF NOT EXISTS idx_company_databases_company_id ON company_databases(company_id);
CREATE INDEX IF NOT EXISTS idx_database_backups_database_name ON database_backups(database_name);

-- Criar função para atualizar o timestamp de atualização
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar triggers para atualizar o timestamp
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Criar usuário admin padrão (senha: admin123)
INSERT INTO companies (name, email, active)
VALUES ('Admin Company', 'admin@example.com', true)
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (name, email, password_hash, role, company_id, is_active)
SELECT
  'Admin User',
  'admin@example.com',
  '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iq.7ZtZxwX5eG', -- senha: admin123
  'admin',
  id,
  true
FROM companies
WHERE email = 'admin@example.com'
ON CONFLICT (email) DO NOTHING;
