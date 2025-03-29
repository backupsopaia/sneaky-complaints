export type UserRole = 'superadmin' | 'admin' | 'manager' | 'auditor' | 'user';

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId?: string;
};

export type Company = {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
};

export type CompanySettings = {
  logoUrl?: string;
  primaryColor?: string;
  welcomeMessage?: string;
  privacyPolicy?: string;
  reportCategories: string[];
  dataRetentionPeriod: number;
  requiresAnonymity: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  companyName: string;
};

export type AuthContextType = {
  user: User | null;
  company: Company | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
};
