import { api } from './api';

export interface Company {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  companyName: string;
}

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data;

      // Salvar token no localStorage
      localStorage.setItem('token', token);

      return { user, token };
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  public async register(data: RegisterData): Promise<{ user: User; token: string }> {
    try {
      const response = await api.post('/auth/register', data);
      const { user, token } = response.data;

      // Salvar token no localStorage
      localStorage.setItem('token', token);

      return { user, token };
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }

  public async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      throw error;
    }
  }

  public async getCompanies(): Promise<Company[]> {
    try {
      const response = await api.get('/auth/companies');
      return response.data;
    } catch (error) {
      console.error('Erro ao obter empresas:', error);
      throw error;
    }
  }

  public async createCompany(data: Omit<Company, 'id' | 'createdAt'>): Promise<Company> {
    try {
      const response = await api.post('/auth/companies', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      throw error;
    }
  }

  public async updateCompany(id: string, data: Partial<Company>): Promise<Company> {
    try {
      const response = await api.put(`/auth/companies/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error);
      throw error;
    }
  }

  public async deleteCompany(id: string): Promise<void> {
    try {
      await api.delete(`/auth/companies/${id}`);
    } catch (error) {
      console.error('Erro ao deletar empresa:', error);
      throw error;
    }
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = AuthService.getInstance();
