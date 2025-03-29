import { Router } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth';

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

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, companyId: user.company_id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Atualizar último login
    await pool.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [user.id]
    );

    // Remover senha do objeto de resposta
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Registro
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, companyName } = req.body;

    // Verificar se o email já existe
    const existingUser = await pool.query(
      'SELECT 1 FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criar empresa
    const companyResult = await pool.query(
      `INSERT INTO companies (name, email, active, created_at)
       VALUES ($1, $2, true, CURRENT_TIMESTAMP)
       RETURNING id`,
      [companyName, email]
    );

    const companyId = companyResult.rows[0].id;

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Criar usuário
    const userResult = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, company_id, created_at)
       VALUES ($1, $2, $3, 'admin', $4, CURRENT_TIMESTAMP)
       RETURNING id, name, email, role, company_id, created_at`,
      [name, email, passwordHash, companyId]
    );

    const user = userResult.rows[0];

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, companyId: user.company_id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      user,
      token
    });
  } catch (error) {
    console.error('Erro ao registrar:', error);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Em uma implementação mais robusta, você poderia invalidar o token aqui
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    res.status(500).json({ error: 'Erro ao fazer logout' });
  }
});

// Obter usuário atual
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT id, name, email, role, company_id, created_at
       FROM users
       WHERE id = $1`,
      [userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    res.status(500).json({ error: 'Erro ao obter informações do usuário' });
  }
});

// Obter empresas
router.get('/companies', authenticateToken, isAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, active, created_at
       FROM companies
       ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao obter empresas:', error);
    res.status(500).json({ error: 'Erro ao obter lista de empresas' });
  }
});

// Criar empresa
router.post('/companies', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Verificar se o email já existe
    const existingCompany = await pool.query(
      'SELECT 1 FROM companies WHERE email = $1',
      [email]
    );

    if (existingCompany.rows.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const result = await pool.query(
      `INSERT INTO companies (name, email, active, created_at)
       VALUES ($1, $2, true, CURRENT_TIMESTAMP)
       RETURNING id, name, email, active, created_at`,
      [name, email]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar empresa:', error);
    res.status(500).json({ error: 'Erro ao criar empresa' });
  }
});

// Atualizar empresa
router.put('/companies/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, active } = req.body;

    const result = await pool.query(
      `UPDATE companies
       SET name = $1, email = $2, active = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING id, name, email, active, created_at, updated_at`,
      [name, email, active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
    res.status(500).json({ error: 'Erro ao atualizar empresa' });
  }
});

// Deletar empresa
router.delete('/companies/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM companies WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }

    res.json({ message: 'Empresa deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar empresa:', error);
    res.status(500).json({ error: 'Erro ao deletar empresa' });
  }
});

export default router;
