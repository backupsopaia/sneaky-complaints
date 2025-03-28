
import { User, Company, CompanySettings } from "../../types/auth";

export interface AuthContextProps {
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
}
