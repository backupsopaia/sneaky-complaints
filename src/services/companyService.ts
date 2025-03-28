
import { Company, CompanySettings } from '../types/auth';
import { getMockCompanies } from '../mocks/companyData';

export const createCompany = async (companyData: Omit<Company, 'id' | 'createdAt'>): Promise<Company> => {
  const newCompany: Company = {
    ...companyData,
    id: `company-${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  console.log(`[LGPD/GDPR Log] Company created: ${newCompany.id} at ${Date.now()}`);
  return newCompany;
};

export const updateCompanySettings = async (companyId: string, settings: Partial<CompanySettings>): Promise<void> => {
  console.log(`[LGPD/GDPR Log] Company settings updated: ${companyId} at ${Date.now()}`);
};

export const getCompanies = async (): Promise<Company[]> => {
  return getMockCompanies();
};

export const getCompanyById = async (id: string): Promise<Company | null> => {
  const companies = getMockCompanies();
  return companies.find(company => company.id === id) || null;
};

export const activateCompany = async (id: string): Promise<void> => {
  console.log(`[LGPD/GDPR Log] Company activated: ${id} at ${Date.now()}`);
};

export const deactivateCompany = async (id: string): Promise<void> => {
  console.log(`[LGPD/GDPR Log] Company deactivated: ${id} at ${Date.now()}`);
};
