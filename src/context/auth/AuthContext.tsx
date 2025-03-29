import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { AuthContextType, User, Company, LoginCredentials, RegisterData } from '@/types/auth';
import {
  DATA_RETENTION_PERIOD,
  handleUserLogin,
  handleUserRegistration,
  handleLogout,
  setupTwoFactorAuth,
  verifyTwoFactorToken,
  performSessionCheck
} from './authUtils';
import { createCompany, updateCompanySettings, getCompanies, getCompanyById, activateCompany, deactivateCompany } from '../../services/companyService';
import { AuthContextProps } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gdprConsent, setGdprConsent] = useState(false);
  const dataRetentionPeriod = DATA_RETENTION_PERIOD;

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          await getCurrentUser();
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const isSuperAdmin = user?.role === 'superadmin';

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.login(credentials);
      setUser(user);

      // Carregar informações da empresa
      if (user.companyId) {
        const companies = await authService.getCompanies();
        const userCompany = companies.find(c => c.id === user.companyId);
        if (userCompany) {
          setCompany(userCompany);
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Verifique suas credenciais.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.register(data);
      setUser(user);

      // Carregar informações da empresa
      if (user.companyId) {
        const companies = await authService.getCompanies();
        const userCompany = companies.find(c => c.id === user.companyId);
        if (userCompany) {
          setCompany(userCompany);
        }
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError('Erro ao registrar. Tente novamente.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
    setUser(null);
      setCompany(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setError('Erro ao fazer logout.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.getCurrentUser();
      setUser(user);

      // Carregar informações da empresa
      if (user.companyId) {
        const companies = await authService.getCompanies();
        const userCompany = companies.find(c => c.id === user.companyId);
        if (userCompany) {
          setCompany(userCompany);
        }
      }
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      setError('Erro ao obter informações do usuário.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const setupTwoFactor = async (): Promise<string> => {
    return setupTwoFactorAuth();
  };

  const verifyTwoFactor = async (token: string): Promise<boolean> => {
    return verifyTwoFactorToken(token);
  };

  const value = {
        user,
    company,
    loading,
    error,
        login,
        register,
        logout,
    getCurrentUser,
        setupTwoFactor,
        verifyTwoFactor,
        gdprConsent,
        setGdprConsent,
        dataRetentionPeriod,
        createCompany,
        updateCompanySettings,
        getCompanies,
        getCompanyById,
        activateCompany,
        deactivateCompany
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
