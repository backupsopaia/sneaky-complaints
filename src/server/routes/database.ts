import { Router } from 'express';
import { Pool } from 'pg';
import { authenticateToken } from '../middleware/auth';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);
const router = Router();

// Configuração do pool de conexões
const pool = new Pool({
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

// Executar query no banco de dados
router.post('/execute', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { query, database, config } = req.body;

    // Criar uma nova conexão com o banco de dados específico
    const client = new Pool({
      ...config,
      database: database
    }).connect();

    const result = await (await client).query(query);
    (await client).release();

    res.json(result);
  } catch (error) {
    console.error('Erro ao executar query:', error);
    res.status(500).json({ error: 'Erro ao executar query no banco de dados' });
  }
});

// Criar backup do banco de dados
router.post('/backup', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { database } = req.body;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `${database}_${timestamp}.sql`;
    const backupPath = path.join(__dirname, '../../backups', backupFileName);

    // Garantir que o diretório de backups existe
    if (!fs.existsSync(path.join(__dirname, '../../backups'))) {
      fs.mkdirSync(path.join(__dirname, '../../backups'), { recursive: true });
    }

    // Executar pg_dump
    const { stdout, stderr } = await execAsync(
      `pg_dump -h ${process.env.DB_HOST} -U ${process.env.DB_USER} -d ${database} -f ${backupPath}`
    );

    if (stderr) {
      throw new Error(`Erro ao criar backup: ${stderr}`);
    }

    // Registrar backup no banco de dados
    await pool.query(
      `INSERT INTO database_backups (database_name, file_name, created_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)`,
      [database, backupFileName]
    );

    res.json({ message: 'Backup criado com sucesso', fileName: backupFileName });
  } catch (error) {
    console.error('Erro ao criar backup:', error);
    res.status(500).json({ error: 'Erro ao criar backup do banco de dados' });
  }
});

// Restaurar backup do banco de dados
router.post('/restore', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { database, backupFileName } = req.body;
    const backupPath = path.join(__dirname, '../../backups', backupFileName);

    // Verificar se o arquivo de backup existe
    if (!fs.existsSync(backupPath)) {
      return res.status(404).json({ error: 'Arquivo de backup não encontrado' });
    }

    // Executar pg_restore
    const { stdout, stderr } = await execAsync(
      `pg_restore -h ${process.env.DB_HOST} -U ${process.env.DB_USER} -d ${database} ${backupPath}`
    );

    if (stderr) {
      throw new Error(`Erro ao restaurar backup: ${stderr}`);
    }

    res.json({ message: 'Backup restaurado com sucesso' });
  } catch (error) {
    console.error('Erro ao restaurar backup:', error);
    res.status(500).json({ error: 'Erro ao restaurar backup do banco de dados' });
  }
});

// Listar backups disponíveis
router.get('/backups/:database', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { database } = req.params;

    const result = await pool.query(
      `SELECT file_name, created_at
       FROM database_backups
       WHERE database_name = $1
       ORDER BY created_at DESC`,
      [database]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar backups:', error);
    res.status(500).json({ error: 'Erro ao listar backups do banco de dados' });
  }
});

// Obter informações do banco de dados
router.get('/info/:database', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { database } = req.params;

    // Verificar se o banco existe
    const existsResult = await pool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [database]
    );

    if (existsResult.rows.length === 0) {
      return res.json({
        name: database,
        exists: false,
        tables: [],
        size: '0 MB'
      });
    }

    // Obter lista de tabelas
    const tablesResult = await pool.query(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_schema = 'public'
       AND table_catalog = $1`,
      [database]
    );

    // Obter tamanho do banco
    const sizeResult = await pool.query(
      `SELECT pg_size_pretty(pg_database_size($1)) as size`,
      [database]
    );

    // Obter último backup
    const backupResult = await pool.query(
      `SELECT created_at
       FROM database_backups
       WHERE database_name = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [database]
    );

    res.json({
      name: database,
      exists: true,
      tables: tablesResult.rows.map(row => row.table_name),
      size: sizeResult.rows[0].size,
      lastBackup: backupResult.rows[0]?.created_at
    });
  } catch (error) {
    console.error('Erro ao obter informações do banco:', error);
    res.status(500).json({ error: 'Erro ao obter informações do banco de dados' });
  }
});

export default router;
