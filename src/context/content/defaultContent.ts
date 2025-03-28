
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
      { id: 'cases', label: 'Casos de Utilização', url: '#' },
      { id: 'testimonials', label: 'Testemunhos', url: '#' }
    ],
    company: [
      { id: 'about', label: 'Sobre Nós', url: '#' },
      { id: 'blog', label: 'Blog', url: '#' },
      { id: 'careers', label: 'Carreiras', url: '#' },
      { id: 'contact', label: 'Contacto', url: '#' }
    ],
    legal: [
      { id: 'terms', label: 'Termos de Serviço', url: '#' },
      { id: 'privacy', label: 'Política de Privacidade', url: '#' },
      { id: 'cookies', label: 'Política de Cookies', url: '#' },
      { id: 'lgpd', label: 'Proteção de Dados', url: '#' }
    ]
  }
};

export const defaultNavigation: MenuItem[] = [
  { id: 'home', label: 'Início', url: '/' },
  { id: 'features', label: 'Recursos', url: '#features' },
  { id: 'pricing', label: 'Preços', url: '#pricing' },
  { id: 'report', label: 'Fazer Denúncia', url: '/report' },
  { id: 'check', label: 'Verificar Estado', url: '/check-status' }
];

export const defaultContent: SiteContent = {
  homepage: {
    title: 'Canal de denúncias seguro e eficiente para a sua empresa',
    subtitle: 'Implemente um canal de denúncias em minutos, garantindo conformidade, anonimato e gestão eficiente.',
    bodyText: '<p>O nosso sistema de denúncias oferece uma plataforma segura e anónima para reportar irregularidades e problemas éticos na sua organização.</p><p>Conformidade com as principais leis e regulamentos nacionais e internacionais, incluindo o Regulamento Geral de Proteção de Dados (RGPD).</p>',
    bannerImage: '/placeholder.svg',
    customNotification: 'Bem-vindo ao sistema de denúncias. Todas as comunicações são seguras e anónimas.'
  },
  login: {
    title: 'Bem-vindo ao Canal de Denúncias',
    subtitle: 'Faça login para aceder ao sistema',
    bodyText: 'Aceda ao sistema de denúncias de forma segura e anónima.',
    bannerImage: '/placeholder.svg',
    customNotification: 'As suas credenciais são protegidas com encriptação avançada.'
  },
  dashboard: {
    title: 'Painel de Controlo',
    subtitle: 'Faça a gestão das suas denúncias com eficiência',
    bodyText: 'Acompanhe o estado das denúncias, comunique com os denunciantes e faça a gestão de todo o processo de investigação.',
    bannerImage: '/placeholder.svg',
    customNotification: 'Novas denúncias são destacadas automaticamente para a sua atenção.'
  },
  navigation: defaultNavigation,
  footer: defaultFooter
};
