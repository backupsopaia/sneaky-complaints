import { api } from './api';
import { Company } from '@/types/auth';

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  defaultDatabase: string;
}

interface DatabaseInfo {
  name: string;
  exists: boolean;
  tables: string[];
  size: string;
  lastBackup?: string;
}

export class DatabaseService {
  private static instance: DatabaseService;
  private config: DatabaseConfig;

  private constructor() {
    this.config = {
      host: process.env.REACT_APP_DB_HOST || 'localhost',
      port: parseInt(process.env.REACT_APP_DB_PORT || '5432'),
      user: process.env.REACT_APP_DB_USER || 'postgres',
      password: process.env.REACT_APP_DB_PASSWORD || 'postgres',
      defaultDatabase: process.env.REACT_APP_DB_NAME || 'postgres'
    };
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Criar um novo banco de dados para uma empresa
  public async createCompanyDatabase(company: Company): Promise<void> {
    try {
      const dbName = this.getDatabaseName(company);

      // Verificar se o banco já existe
      const exists = await this.checkDatabaseExists(dbName);
      if (exists) {
        throw new Error(`Banco de dados ${dbName} já existe`);
      }

      // Criar o banco de dados
      await this.executeQuery(
        `CREATE DATABASE ${dbName} WITH OWNER = ${this.config.user}`
      );

      // Criar as tabelas necessárias
      await this.initializeCompanyDatabase(dbName);

      // Registrar o banco de dados na tabela de controle
      await this.registerCompanyDatabase(company, dbName);

    } catch (error) {
      console.error('Erro ao criar banco de dados:', error);
      throw error;
    }
  }

  // Verificar se um banco de dados existe
  private async checkDatabaseExists(dbName: string): Promise<boolean> {
    try {
      const result = await this.executeQuery(
        `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`
      );
      return result.rows.length > 0;
    } catch (error) {
      console.error('Erro ao verificar existência do banco:', error);
      throw error;
    }
  }

  // Inicializar as tabelas do banco de dados da empresa
  private async initializeCompanyDatabase(dbName: string): Promise<void> {
    const queries = [
      // Tabela de denúncias
      `CREATE TABLE complaints (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP WITH TIME ZONE,
        created_by INTEGER,
        assigned_to INTEGER,
        priority VARCHAR(20) DEFAULT 'medium',
        tags TEXT[],
        metadata JSONB
      )`,

      // Tabela de usuários
      `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP WITH TIME ZONE,
        is_active BOOLEAN DEFAULT true
      )`,

      // Tabela de comentários
      `CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        complaint_id INTEGER REFERENCES complaints(id),
        user_id INTEGER REFERENCES users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        is_internal BOOLEAN DEFAULT false
      )`,

      // Tabela de anexos
      `CREATE TABLE attachments (
        id SERIAL PRIMARY KEY,
        complaint_id INTEGER REFERENCES complaints(id),
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        file_type VARCHAR(50),
        file_size INTEGER,
        uploaded_by INTEGER REFERENCES users(id),
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`,

      // Tabela de logs
      `CREATE TABLE activity_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        action VARCHAR(50) NOT NULL,
        entity_type VARCHAR(50) NOT NULL,
        entity_id INTEGER NOT NULL,
        details JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`,

      // Índices para melhor performance
      `CREATE INDEX idx_complaints_status ON complaints(status)`,
      `CREATE INDEX idx_complaints_category ON complaints(category)`,
      `CREATE INDEX idx_complaints_created_at ON complaints(created_at)`,
      `CREATE INDEX idx_comments_complaint_id ON comments(complaint_id)`,
      `CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id)`
    ];

    for (const query of queries) {
      await this.executeQuery(query, dbName);
    }
  }

  // Registrar o banco de dados na tabela de controle
  private async registerCompanyDatabase(company: Company, dbName: string): Promise<void> {
    await this.executeQuery(
      `INSERT INTO company_databases (company_id, database_name, created_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)`,
      [company.id, dbName]
    );
  }

  // Obter informações sobre o banco de dados de uma empresa
  public async getDatabaseInfo(company: Company): Promise<DatabaseInfo> {
    try {
      const dbName = this.getDatabaseName(company);

      // Verificar existência
      const exists = await this.checkDatabaseExists(dbName);

      if (!exists) {
        return {
          name: dbName,
          exists: false,
          tables: [],
          size: '0 MB'
        };
      }

      // Obter lista de tabelas
      const tablesResult = await this.executeQuery(
        `SELECT table_name
         FROM information_schema.tables
         WHERE table_schema = 'public'`,
        dbName
      );
      const tables = tablesResult.rows.map(row => row.table_name);

      // Obter tamanho do banco
      const sizeResult = await this.executeQuery(
        `SELECT pg_size_pretty(pg_database_size('${dbName}')) as size`,
        dbName
      );
      const size = sizeResult.rows[0].size;

      // Obter último backup (se houver)
      const backupResult = await this.executeQuery(
        `SELECT created_at
         FROM database_backups
         WHERE database_name = '${dbName}'
         ORDER BY created_at DESC
         LIMIT 1`
      );
      const lastBackup = backupResult.rows[0]?.created_at;

      return {
        name: dbName,
        exists: true,
        tables,
        size,
        lastBackup
      };
    } catch (error) {
      console.error('Erro ao obter informações do banco:', error);
      throw error;
    }
  }

  // Realizar backup do banco de dados
  public async backupDatabase(company: Company): Promise<void> {
    try {
      const dbName = this.getDatabaseName(company);

      // Verificar se o banco existe
      const exists = await this.checkDatabaseExists(dbName);
      if (!exists) {
        throw new Error(`Banco de dados ${dbName} não existe`);
      }

      // Gerar nome do arquivo de backup
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFileName = `${dbName}_${timestamp}.sql`;

      // Executar backup usando pg_dump
      await this.executeQuery(
        `SELECT pg_dump('${dbName}', '${backupFileName}')`
      );

      // Registrar backup na tabela de controle
      await this.executeQuery(
        `INSERT INTO database_backups (database_name, file_name, created_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)`,
        [dbName, backupFileName]
      );

    } catch (error) {
      console.error('Erro ao realizar backup:', error);
      throw error;
    }
  }

  // Restaurar banco de dados de um backup
  public async restoreDatabase(company: Company, backupFileName: string): Promise<void> {
    try {
      const dbName = this.getDatabaseName(company);

      // Verificar se o backup existe
      const backupExists = await this.executeQuery(
        `SELECT 1 FROM database_backups
         WHERE database_name = '${dbName}'
         AND file_name = '${backupFileName}'`
      );

      if (backupExists.rows.length === 0) {
        throw new Error('Backup não encontrado');
      }

      // Restaurar o banco usando pg_restore
      await this.executeQuery(
        `SELECT pg_restore('${dbName}', '${backupFileName}')`
      );

    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      throw error;
    }
  }

  // Gerar nome do banco de dados para uma empresa
  private getDatabaseName(company: Company): string {
    // Remover caracteres especiais e espaços
    const sanitizedName = company.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');

    return `company_${sanitizedName}_${company.id}`;
  }

  // Executar query no banco de dados
  private async executeQuery(query: string, dbName?: string): Promise<any> {
    try {
      const targetDb = dbName || this.config.defaultDatabase;
      const response = await api.post('/database/execute', {
        query,
        database: targetDb,
        config: this.config
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao executar query:', error);
      throw error;
    }
  }
}

export const databaseService = DatabaseService.getInstance();
