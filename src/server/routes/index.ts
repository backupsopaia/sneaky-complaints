
import { Router } from 'express';
import usersRouter from './users';
import companiesRouter from './companies';
import complaintsRouter from './complaints';
import authRouter from './auth';
import databaseRouter from './database';
import companyDatabasesRouter from './company-databases';

const router = Router();

router.use('/users', usersRouter);
router.use('/companies', companiesRouter);
router.use('/complaints', complaintsRouter);
router.use('/auth', authRouter);
router.use('/database', databaseRouter);
router.use('/company-databases', companyDatabasesRouter);

export default router;
