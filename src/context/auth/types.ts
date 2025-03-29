import { User, Company, CompanySettings } from "../../types/auth";

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  company: Company | null;
  error: string | null;
  gdprConsent: boolean;
  setGdprConsent: (consent: boolean) => void;
  dataRetentionPeriod: number;
  createCompany: (company: Company) => Promise<void>;
  updateCompanySettings: (company: Company) => Promise<void>;
  getCompanies: () => Promise<Company[]>;
  getCompanyById: (id: string) => Promise<Company | null>;
  activateCompany: (company: Company) => Promise<void>;
  deactivateCompany: (company: Company) => Promise<void>;
}
