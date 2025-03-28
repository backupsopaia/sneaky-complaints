import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import CryptoJS from 'crypto-js';

type User = {
  id: string;
  email: string;
  companyName?: string;
  role: 'superadmin' | 'admin' | 'manager' | 'auditor' | 'user';
  plan?: 'free' | 'pro' | 'enterprise';
  twoFactorEnabled?: boolean;
  managedCompanies?: Company[];
};

type Company = {
  id: string;
  name: string;
  domain?: string;
  customDomain?: string;
  active: boolean;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
  settings: CompanySettings;
};

type CompanySettings = {
  logoUrl?: string;
  primaryColor?: string;
  welcomeMessage?: string;
  privacyPolicy?: string;
  reportCategories: string[];
  dataRetentionPeriod: number;
  requiresAnonymity: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSuperAdmin: boolean;
  login: (email: string, password: string, token?: string, asSuperAdmin?: boolean) => Promise<void>;
  register: (email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
  setupTwoFactor: () => Promise<string>;
  verifyTwoFactor: (token: string) => Promise<boolean>;
  encryptData: (data: string) => string;
  decryptData: (encryptedData: string) => string;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  dataRetentionPeriod: number;
  createCompany: (company: Omit<Company, 'id' | 'createdAt'>) => Promise<Company>;
  updateCompanySettings: (companyId: string, settings: Partial<CompanySettings>) => Promise<void>;
  getCompanies: () => Promise<Company[]>;
  getCompanyById: (id: string) => Promise<Company | null>;
  activateCompany: (id: string) => Promise<void>;
  deactivateCompany: (id: string) => Promise<void>;
};

const SECRET_KEY = "YourSecureAppEncryptionKey-LGPD-GDPR-Compliant";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gdprConsent, setGdprConsent] = useState(false);
  const dataRetentionPeriod = 365;

  const encryptData = (data: string): string => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  };

  const decryptData = (encryptedData: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

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

  const isValidInput = (input: string): boolean => {
    return !/<script|onerror|javascript:/i.test(input);
  };

  const isStrongPassword = (password: string): boolean => {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[^A-Za-z0-9]/.test(password);
  };

  const getMockCompanies = (): Company[] => {
    return [
      {
        id: 'company-1',
        name: 'Empresa Exemplo A',
        domain: 'empresaa',
        customDomain: 'denuncias.empresaa.com.br',
        active: true,
        plan: 'enterprise',
        createdAt: new Date(2023, 1, 15).toISOString(),
        settings: {
          logoUrl: '/logos/company-a.png',
          primaryColor: '#004D99',
          welcomeMessage: 'Bem-vindo ao canal de denúncias da Empresa A',
          privacyPolicy: 'Política de privacidade personalizada...',
          reportCategories: ['Assédio', 'Fraude', 'Corrupção', 'Discriminação'],
          dataRetentionPeriod: 730,
          requiresAnonymity: true
        }
      },
      {
        id: 'company-2',
        name: 'Corporação B',
        domain: 'corpb',
        active: true,
        plan: 'pro',
        createdAt: new Date(2023, 5, 20).toISOString(),
        settings: {
          primaryColor: '#2E7D32',
          reportCategories: ['Assédio Moral', 'Assédio Sexual', 'Violação de Compliance'],
          dataRetentionPeriod: 365,
          requiresAnonymity: false
        }
      },
      {
        id: 'company-3',
        name: 'Startup C',
        domain: 'startupc',
        active: false,
        plan: 'free',
        createdAt: new Date(2023, 8, 5).toISOString(),
        settings: {
          reportCategories: ['Conduta Inapropriada', 'Questões Éticas'],
          dataRetentionPeriod: 180,
          requiresAnonymity: true
        }
      }
    ];
  };

  const createCompany = async (companyData: Omit<Company, 'id' | 'createdAt'>): Promise<Company> => {
    const newCompany: Company = {
      ...companyData,
      id: `company-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    console.log(`[LGPD/GDPR Log] Company created: ${newCompany.id} at ${Date.now()}`);
    return newCompany;
  };

  const updateCompanySettings = async (companyId: string, settings: Partial<CompanySettings>): Promise<void> => {
    console.log(`[LGPD/GDPR Log] Company settings updated: ${companyId} at ${Date.now()}`);
  };

  const getCompanies = async (): Promise<Company[]> => {
    return getMockCompanies();
  };

  const getCompanyById = async (id: string): Promise<Company | null> => {
    const companies = getMockCompanies();
    return companies.find(company => company.id === id) || null;
  };

  const activateCompany = async (id: string): Promise<void> => {
    console.log(`[LGPD/GDPR Log] Company activated: ${id} at ${Date.now()}`);
  };

  const deactivateCompany = async (id: string): Promise<void> => {
    console.log(`[LGPD/GDPR Log] Company deactivated: ${id} at ${Date.now()}`);
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
