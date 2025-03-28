
import { toast } from '@/components/ui/use-toast';
import { User } from '../../types/auth';
import { encryptData, decryptData, isValidInput, isStrongPassword } from '../../utils/authUtils';
import { getMockCompanies } from '../../mocks/companyData';

export const DATA_RETENTION_PERIOD = 365;

export const handleUserLogin = async (
  email: string, 
  password: string, 
  token?: string | null, 
  asSuperAdmin?: boolean
): Promise<User> => {
  if (!isValidInput(email) || !isValidInput(password)) {
    throw new Error("Entrada inválida detectada");
  }

  if (asSuperAdmin) {
    if (email === "admin@denuncieaqui.com" && password === "admin123") {
      const mockSuperAdmin: User = {
        id: 'super-1',
        email,
        role: 'superadmin',
        twoFactorEnabled: false,
        managedCompanies: getMockCompanies()
      };

      return mockSuperAdmin;
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
      twoFactorEnabled: false
    };

    return mockUser;
  }

  // This is a fallback that allows any credentials to work for testing
  // In a real app, you would validate against a database
  const mockUser: User = {
    id: '1',
    email,
    companyName: 'Empresa Demonstração',
    role: 'admin',
    plan: 'pro',
    twoFactorEnabled: false
  };

  return mockUser;
};

export const handleUserRegistration = async (
  email: string,
  password: string,
  companyName: string
): Promise<User> => {
  if (!isValidInput(email) || !isValidInput(password) || !isValidInput(companyName)) {
    throw new Error("Entrada inválida detectada");
  }

  if (!isStrongPassword(password)) {
    throw new Error("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos");
  }

  return {
    id: Date.now().toString(),
    email,
    companyName,
    role: 'admin',
    plan: 'free',
    twoFactorEnabled: false
  };
};

export const handleLogout = (): void => {
  localStorage.removeItem('encrypted_user');
  localStorage.removeItem('session_start_time');
  console.log(`[LGPD/GDPR Log] User logout: ${Date.now()}`);
};

export const setupTwoFactorAuth = async (): Promise<string> => {
  return "ABCDE12345";
};

export const verifyTwoFactorToken = async (token: string): Promise<boolean> => {
  return token.length === 6 && /^\d+$/.test(token);
};

export const performSessionCheck = (
  encryptedUser: string | null, 
  dataRetentionPeriod: number
): User | null => {
  if (!encryptedUser) return null;
  
  try {
    const decryptedUserData = decryptData(encryptedUser);
    const user = JSON.parse(decryptedUserData) as User;
    
    const sessionTime = localStorage.getItem('session_start_time');
    if (sessionTime) {
      const sessionAge = Date.now() - parseInt(sessionTime);
      if (sessionAge > dataRetentionPeriod * 24 * 60 * 60 * 1000) {
        handleLogout();
        toast({
          title: "Sessão expirada",
          description: "Por motivos de segurança, sua sessão expirou. Por favor, faça login novamente.",
          variant: "destructive"
        });
        return null;
      }
    }
    
    return user;
  } catch (error) {
    console.error('Error checking authentication:', error);
    localStorage.removeItem('encrypted_user');
    return null;
  }
};
