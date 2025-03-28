
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import CryptoJS from 'crypto-js';

type User = {
  id: string;
  email: string;
  companyName?: string;
  role: 'admin' | 'user';
  plan?: 'free' | 'pro' | 'enterprise';
  twoFactorEnabled?: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, token?: string) => Promise<void>;
  register: (email: string, password: string, companyName: string) => Promise<void>;
  logout: () => void;
  setupTwoFactor: () => Promise<string>;
  verifyTwoFactor: (token: string) => Promise<boolean>;
  encryptData: (data: string) => string;
  decryptData: (encryptedData: string) => string;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  dataRetentionPeriod: number; // in days
};

// Secret key for local encryption - in a real app this would be retrieved from a secure source
const SECRET_KEY = "YourSecureAppEncryptionKey-LGPD-GDPR-Compliant";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gdprConsent, setGdprConsent] = useState(false);
  const dataRetentionPeriod = 365; // Default 1 year
  
  // AES encryption for sensitive data
  const encryptData = (data: string): string => {
    return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  };
  
  const decryptData = (encryptedData: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    // Check for an existing user session in localStorage with encryption
    const checkAuth = () => {
      try {
        const encryptedUser = localStorage.getItem('encrypted_user');
        if (encryptedUser) {
          const decryptedUserData = decryptData(encryptedUser);
          setUser(JSON.parse(decryptedUserData));
          
          // GDPR/LGPD - Check session age and log consent
          const sessionTime = localStorage.getItem('session_start_time');
          if (sessionTime) {
            const sessionAge = Date.now() - parseInt(sessionTime);
            // If session is older than the retention period (in milliseconds), logout
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

  const login = async (email: string, password: string, token?: string) => {
    setIsLoading(true);
    try {
      // Validate input to prevent XSS attacks
      if (!isValidInput(email) || !isValidInput(password)) {
        throw new Error("Entrada inválida detectada");
      }
      
      // This is a mock login - in a real app, this would call a secure HTTPS API
      // For now, we'll simulate a successful login with a mock user
      const mockUser: User = {
        id: '1',
        email,
        companyName: 'Empresa Demonstração',
        role: 'admin',
        plan: 'pro',
        twoFactorEnabled: true
      };
      
      // If 2FA is enabled, require token
      if (mockUser.twoFactorEnabled && !token) {
        setIsLoading(false);
        throw new Error("Autenticação de dois fatores necessária");
      }
      
      // Store encrypted user in localStorage for persistence
      const encryptedUserData = encryptData(JSON.stringify(mockUser));
      localStorage.setItem('encrypted_user', encryptedUserData);
      localStorage.setItem('session_start_time', Date.now().toString());
      
      // Log for LGPD/GDPR compliance
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
      // Validate input to prevent XSS attacks
      if (!isValidInput(email) || !isValidInput(password) || !isValidInput(companyName)) {
        throw new Error("Entrada inválida detectada");
      }
      
      // Password strength check
      if (!isStrongPassword(password)) {
        throw new Error("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos");
      }
      
      // This is a mock registration - in a real app, this would call a secure HTTPS API
      // For now, we'll simulate a successful registration with a mock user
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        companyName,
        role: 'admin',
        plan: 'free',
        twoFactorEnabled: false
      };
      
      // Store encrypted user in localStorage
      const encryptedUserData = encryptData(JSON.stringify(mockUser));
      localStorage.setItem('encrypted_user', encryptedUserData);
      localStorage.setItem('session_start_time', Date.now().toString());
      
      // Log for LGPD/GDPR compliance
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
    // Securely clear user data
    localStorage.removeItem('encrypted_user');
    localStorage.removeItem('session_start_time');
    setUser(null);
    
    // Log for LGPD/GDPR compliance
    console.log(`[LGPD/GDPR Log] User logout: ${Date.now()}`);
  };
  
  // Setup two-factor authentication
  const setupTwoFactor = async (): Promise<string> => {
    // In a real app, this would generate a QR code or backup codes
    // For this mock implementation, return a fake secret key
    return "ABCDE12345";
  };
  
  // Verify two-factor authentication token
  const verifyTwoFactor = async (token: string): Promise<boolean> => {
    // Mock implementation - in a real app, this would verify the token
    return token.length === 6 && /^\d+$/.test(token);
  };
  
  // Input validation to prevent XSS
  const isValidInput = (input: string): boolean => {
    // Basic XSS prevention - would be more sophisticated in a real app
    return !/<script|onerror|javascript:/i.test(input);
  };
  
  // Password strength checker
  const isStrongPassword = (password: string): boolean => {
    // Requires at least 8 chars, with uppercase, lowercase, number and special char
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password) && 
           /[^A-Za-z0-9]/.test(password);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        setupTwoFactor,
        verifyTwoFactor,
        encryptData,
        decryptData,
        gdprConsent,
        setGdprConsent,
        dataRetentionPeriod
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
