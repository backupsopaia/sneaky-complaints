
import { Company } from '../types/auth';

export const getMockCompanies = (): Company[] => {
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
