
import React, { createContext, useState, useEffect } from 'react';
import { User } from '../../types/auth';
import { encryptData, decryptData } from '../../utils/authUtils';
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

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gdprConsent, setGdprConsent] = useState(false);
  const dataRetentionPeriod = DATA_RETENTION_PERIOD;

  useEffect(() => {
    const checkAuth = () => {
      try {
        const encryptedUser = localStorage.getItem('encrypted_user');
        const checkedUser = performSessionCheck(encryptedUser, dataRetentionPeriod);
        setUser(checkedUser);
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
      const authenticatedUser = await handleUserLogin(email, password, token, asSuperAdmin);
      
      const encryptedUserData = encryptData(JSON.stringify(authenticatedUser));
      localStorage.setItem('encrypted_user', encryptedUserData);
      localStorage.setItem('session_start_time', Date.now().toString());

      console.log(`[LGPD/GDPR Log] User login: ${Date.now()}`);
      setUser(authenticatedUser);
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
      const registeredUser = await handleUserRegistration(email, password, companyName);
      
      const encryptedUserData = encryptData(JSON.stringify(registeredUser));
      localStorage.setItem('encrypted_user', encryptedUserData);
      localStorage.setItem('session_start_time', Date.now().toString());

      console.log(`[LGPD/GDPR Log] User registration: ${Date.now()}`);
      setUser(registeredUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    handleLogout();
    setUser(null);
  };

  const setupTwoFactor = async (): Promise<string> => {
    return setupTwoFactorAuth();
  };

  const verifyTwoFactor = async (token: string): Promise<boolean> => {
    return verifyTwoFactorToken(token);
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
