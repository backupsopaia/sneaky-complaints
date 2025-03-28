import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { User, AuthContextType } from '../types/auth';
import { encryptData, decryptData, isValidInput, isStrongPassword } from '../utils/authUtils';
import { createCompany, updateCompanySettings, getCompanies, getCompanyById, activateCompany, deactivateCompany } from '../services/companyService';
import { getMockCompanies } from '../mocks/companyData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gdprConsent, setGdprConsent] = useState(false);
  const dataRetentionPeriod = 365;

  useEffect(() => {
    const checkAuth = () => {
      try {
        const encryptedUser = localStorage.getItem('encrypted_user');
        if (encryptedUser) {
          const decryptedUserData = decryptData(encryptedUser);
          setUser(JSON.parse(decryptedUserData));
          
          const sessionTime = localStorage.getItem('session_start_time');
          if (sessionTime) {
            const sessionAge = Date.now() - parseInt(sessionTime);
            if (sessionAge > dataRetentionPeriod * 24 * 60 * 60 * 1000) {
              logout();
              toast({
                title: "Sessão expirada",
                description: "Por motivos de segurança, sua sessão expirou. Por favor, faça login novamente.",
                variant: "destructive"
              });
            }
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('encrypted_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const isSuperAdmin = user?.role === 'superadmin';

  const login = async (email: string, password: string, token?: string, asSuperAdmin?: boolean) => {
    setIsLoading(true);
    try {
      if (!isValidInput(email) || !isValidInput(password)) {
        throw new Error("Entrada inválida detectada");
      }

      if (asSuperAdmin) {
        if (email === "admin@denuncieaqui.com" && password === "admin123") {
          const mockSuperAdmin: User = {
            id: 'super-1',
            email,
            role: 'superadmin',
            twoFactorEnabled: true,
            managedCompanies: getMockCompanies()
          };

          if (mockSuperAdmin.twoFactorEnabled && !token) {
            setIsLoading(false);
            throw new Error("Autenticação de dois fatores necessária");
          }

          const encryptedUserData = encryptData(JSON.stringify(mockSuperAdmin));
          localStorage.setItem('encrypted_user', encryptedUserData);
          localStorage.setItem('session_start_time', Date.now().toString());

          console.log(`[LGPD/GDPR Log] Super Admin login: ${Date.now()}`);
          setUser(mockSuperAdmin);
          setIsLoading(false);
          return;
        } else {
          throw new Error("Credenciais de Super Admin inválidas");
        }
      }

      if (email === "empresa@example.com" && password === "Senha@123") {
        const mockUser: User = {
          id: '1',
          email,
          companyName: 'Empresa Demonstração',
          role: 'admin',
          plan: 'pro',
          twoFactorEnabled: true
        };

        if (mockUser.twoFactorEnabled && !token) {
          setIsLoading(false);
          throw new Error("Autenticação de dois fatores necessária");
        }

        const encryptedUserData = encryptData(JSON.stringify(mockUser));
        localStorage.setItem('encrypted_user', encryptedUserData);
        localStorage.setItem('session_start_time', Date.now().toString());

        console.log(`[LGPD/GDPR Log] User login: ${Date.now()}`);
        setUser(mockUser);
        setIsLoading(false);
        return;
      }

      const mockUser: User = {
        id: '1',
        email,
        companyName: 'Empresa Demonstração',
        role: 'admin',
        plan: 'pro',
        twoFactorEnabled: true
      };

      if (mockUser.twoFactorEnabled && !token) {
        setIsLoading(false);
        throw new Error("Autenticação de dois fatores necessária");
      }

      const encryptedUserData = encryptData(JSON.stringify(mockUser));
      localStorage.setItem('encrypted_user', encryptedUserData);
      localStorage.setItem('session_start_time', Date.now().toString());

      console.log(`[LGPD/GDPR Log] User login: ${Date.now()}`);
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, companyName: string) => {
    setIsLoading(true);
    try {
      if (!isValidInput(email) || !isValidInput(password) || !isValidInput(companyName)) {
        throw new Error("Entrada inválida detectada");
      }

      if (!isStrongPassword(password)) {
        throw new Error("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos");
      }

      const mockUser: User = {
        id: Date.now().toString(),
        email,
        companyName,
        role: 'admin',
        plan: 'free',
        twoFactorEnabled: false
      };

      const encryptedUserData = encryptData(JSON.stringify(mockUser));
      localStorage.setItem('encrypted_user', encryptedUserData);
      localStorage.setItem('session_start_time', Date.now().toString());

      console.log(`[LGPD/GDPR Log] User registration: ${Date.now()}`);
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('encrypted_user');
    localStorage.removeItem('session_start_time');
    setUser(null);

    console.log(`[LGPD/GDPR Log] User logout: ${Date.now()}`);
  };

  const setupTwoFactor = async (): Promise<string> => {
    return "ABCDE12345";
  };

  const verifyTwoFactor = async (token: string): Promise<boolean> => {
    return token.length === 6 && /^\d+$/.test(token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isSuperAdmin,
        login,
        register,
        logout,
        setupTwoFactor,
        verifyTwoFactor,
        encryptData,
        decryptData,
        gdprConsent,
        setGdprConsent,
        dataRetentionPeriod,
        createCompany,
        updateCompanySettings,
        getCompanies,
        getCompanyById,
        activateCompany,
        deactivateCompany
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
