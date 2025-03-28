
import { FooterSection, MenuItem, SiteContent } from './types';

export const defaultFooter: FooterSection = {
  companyDescription: 'Plataforma segura e eficiente para gestão de denúncias empresariais.',
  copyright: '© 2025 DenuncieAqui. Todos os direitos reservados.',
  socialLinks: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#'
  },
  menuGroups: {
    product: [
      { id: 'features', label: 'Recursos', url: '#features' },
      { id: 'pricing', label: 'Preços', url: '#pricing' },
      { id: 'cases', label: 'Casos de Uso', url: '#' },
      { id: 'testimonials', label: 'Depoimentos', url: '#' }
    ],
    company: [
      { id: 'about', label: 'Sobre Nós', url: '#' },
      { id: 'blog', label: 'Blogue', url: '#' },
      { id: 'careers', label: 'Carreiras', url: '#' },
      { id: 'contact', label: 'Contato', url: '#' }
    ],
    legal: [
      { id: 'terms', label: 'Termos de Serviço', url: '#' },
      { id: 'privacy', label: 'Política de Privacidade', url: '#' },
      { id: 'cookies', label: 'Política de Cookies', url: '#' },
      { id: 'lgpd', label: 'LGPD', url: '#' }
    ]
  }
};

export const defaultNavigation: MenuItem[] = [
  { id: 'home', label: 'Início', url: '/' },
  { id: 'features', label: 'Recursos', url: '#features' },
  { id: 'pricing', label: 'Preços', url: '#pricing' },
  { id: 'report', label: 'Fazer Denúncia', url: '/report' },
  { id: 'check', label: 'Verificar Status', url: '/check-status' }
];

export const defaultContent: SiteContent = {
  homepage: {
    title: 'Canal de denúncias seguro e eficiente para sua empresa',
    subtitle: 'Implemente um canal de denúncias em minutos, garantindo compliance, anonimato e gestão eficiente.',
    bodyText: '<p>Nosso sistema de denúncias oferece uma plataforma segura e anônima para relatar irregularidades e problemas éticos na sua organização.</p><p>Conformidade com as principais leis e regulamentos nacionais e internacionais, incluindo a Lei Geral de Proteção de Dados (LGPD).</p>',
    bannerImage: '/placeholder.svg',
    customNotification: 'Bem-vindo ao sistema de denúncias. Todas as comunicações são seguras e anônimas.'
  },
  login: {
    title: 'Bem-vindo ao Canal de Denúncias',
    subtitle: 'Faça login para acessar o sistema',
    bodyText: 'Acesse o sistema de denúncias de forma segura e anônima.',
    bannerImage: '/placeholder.svg',
    customNotification: 'Suas credenciais são protegidas com criptografia avançada.'
  },
  dashboard: {
    title: 'Painel de Controle',
    subtitle: 'Gerencie suas denúncias com eficiência',
    bodyText: 'Acompanhe o status das denúncias, comunique-se com os denunciantes e gerencie todo o processo de investigação.',
    bannerImage: '/placeholder.svg',
    customNotification: 'Novas denúncias são destacadas automaticamente para sua atenção.'
  },
  navigation: defaultNavigation,
  footer: defaultFooter
};
