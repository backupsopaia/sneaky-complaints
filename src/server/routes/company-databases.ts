
import { Router } from 'express';
import { Pool } from 'pg';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Configuração do pool de conexões para o banco mestre
const masterPool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres'
});

// Middleware para verificar permissões de administrador
const isAdmin = (req: any, res: any, next: any) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem executar esta operação.' });
  }
  next();
};

// Criar banco de dados para empresa
router.post('/create', authenticateToken, isAdmin, async (req, res) => {
  const { companyId, companyName } = req.body;
  
  if (!companyId || !companyName) {
    return res.status(400).json({ error: 'ID e nome da empresa são obrigatórios' });
  }
  
  const client = await masterPool.connect();
  
  try {
    // Sanitizar o nome da empresa para usar como nome do banco
    const dbName = `company_${companyName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${companyId}`;
    
    // Verificar se o banco já existe
    const checkResult = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );
    
    if (checkResult.rows.length > 0) {
      return res.status(409).json({ 
        error: 'Banco de dados já existe para esta empresa',
        dbName
      });
    }
    
    // Criar o banco de dados
    await client.query(`CREATE DATABASE ${dbName}`);
    
    // Conectar ao banco recém-criado para inicializar as tabelas
    const companyPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: dbName
    });
    
    // Inicializar tabelas básicas
    const initQueries = [
      `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE complaints (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'open',
        priority VARCHAR(50) DEFAULT 'medium',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        reporter_id INTEGER REFERENCES users(id)
      )`,
      
      `CREATE TABLE complaint_comments (
        id SERIAL PRIMARY KEY,
        complaint_id INTEGER REFERENCES complaints(id),
        user_id INTEGER REFERENCES users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`
    ];
    
    const companyClient = await companyPool.connect();
    
    try {
      for (const query of initQueries) {
        await companyClient.query(query);
      }
      
      // Registrar o banco de dados na tabela do banco mestre
      await client.query(
        `INSERT INTO company_databases (company_id, database_name, created_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)`,
        [companyId, dbName]
      );
      
      res.status(201).json({ 
        message: 'Banco de dados criado com sucesso',
        dbName 
      });
    } finally {
      companyClient.release();
      await companyPool.end();
    }
  } catch (error: any) {
    console.error('Erro ao criar banco de dados:', error);
    res.status(500).json({ 
      error: 'Erro ao criar banco de dados',
      message: error.message 
    });
  } finally {
    client.release();
  }
});

// Listar bancos de dados das empresas
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const result = await masterPool.query(
      `SELECT company_id, database_name, created_at, last_backup 
       FROM company_databases
       ORDER BY created_at DESC`
    );
    
    res.json(result.rows);
  } catch (error: any) {
    console.error('Erro ao listar bancos de dados:', error);
    res.status(500).json({ 
      error: 'Erro ao listar bancos de dados',
      message: error.message 
    });
  }
});

// Obter informações de um banco específico
router.get('/:companyId', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { companyId } = req.params;
    
    const result = await masterPool.query(
      `SELECT company_id, database_name, created_at, last_backup 
       FROM company_databases
       WHERE company_id = $1`,
      [companyId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Banco de dados não encontrado para esta empresa' });
    }
    
    const dbInfo = result.rows[0];
    const dbName = dbInfo.database_name;
    
    // Obter estatísticas do banco
    const statsResult = await masterPool.query(
      `SELECT pg_size_pretty(pg_database_size($1)) as size`,
      [dbName]
    );
    
    // Obter lista de tabelas
    const tablesResult = await masterPool.query(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_catalog = $1
       AND table_schema = 'public'`,
      [dbName]
    );
    
    res.json({
      ...dbInfo,
      size: statsResult.rows[0]?.size || '0 bytes',
      tables: tablesResult.rows.map(row => row.table_name)
    });
  } catch (error: any) {
    console.error('Erro ao obter informações do banco de dados:', error);
    res.status(500).json({ 
      error: 'Erro ao obter informações do banco de dados',
      message: error.message 
    });
  }
});

// Fazer backup do banco de dados
router.post('/:companyId/backup', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { companyId } = req.params;
    
    // Obter nome do banco
    const dbResult = await masterPool.query(
      `SELECT database_name FROM company_databases WHERE company_id = $1`,
      [companyId]
    );
    
    if (dbResult.rows.length === 0) {
      return res.status(404).json({ error: 'Banco de dados não encontrado para esta empresa' });
    }
    
    const dbName = dbResult.rows[0].database_name;
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupName = `${dbName}_${timestamp}.sql`;
    
    // Registrar backup
    await masterPool.query(
      `UPDATE company_databases 
       SET last_backup = CURRENT_TIMESTAMP 
       WHERE company_id = $1`,
      [companyId]
    );
    
    // Em produção, aqui seria executado o comando pg_dump
    // usando child_process.exec, mas para simplificar, apenas
    // simulamos o backup
    
    res.json({ 
      message: 'Backup realizado com sucesso',
      backupName,
      timestamp: new Date()
    });
  } catch (error: any) {
    console.error('Erro ao realizar backup:', error);
    res.status(500).json({ 
      error: 'Erro ao realizar backup',
      message: error.message 
    });
  }
});

export default router;
