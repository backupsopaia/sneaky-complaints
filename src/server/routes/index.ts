import { Router } from 'express';
import authRoutes from './auth';
import databaseRoutes from './database';
import complaintRoutes from './complaints';
import userRoutes from './users';
import companyRoutes from './companies';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de banco de dados
router.use('/database', databaseRoutes);

// Rotas de denúncias
router.use('/complaints', complaintRoutes);

// Rotas de usuários
router.use('/users', userRoutes);

// Rotas de empresas
router.use('/companies', companyRoutes);

export default router;
