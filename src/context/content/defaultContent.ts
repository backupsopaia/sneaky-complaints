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
      { id: 'features', label: 'Recursos', url: '/features' },
      { id: 'pricing', label: 'Preços', url: '/pricing' },
      { id: 'cases', label: 'Casos de Utilização', url: '/use-cases' },
      { id: 'testimonials', label: 'Testemunhos', url: '/testimonials' }
    ],
    company: [
      { id: 'about', label: 'Sobre Nós', url: '/about' },
      { id: 'contact', label: 'Contacto', url: '/contact' }
    ],
    legal: [
      { id: 'terms', label: 'Termos de Serviço', url: '/terms' },
      { id: 'privacy', label: 'Política de Privacidade', url: '/privacy' },
      { id: 'cookies', label: 'Política de Cookies', url: '/cookies' },
      { id: 'lgpd', label: 'Proteção de Dados', url: '/data-protection' }
    ]
  }
};

export const defaultNavigation: MenuItem[] = [
  { id: 'home', label: 'Início', url: '/' },
  { id: 'about', label: 'Sobre', url: '/about' },
  { id: 'features', label: 'Recursos', url: '#features' },
  { id: 'pricing', label: 'Preços', url: '/pricing' },
  { id: 'report', label: 'Fazer Denúncia', url: '/report' },
  { id: 'check', label: 'Verificar Estado', url: '/check-status' }
];

export const defaultContent: SiteContent = {
  homepage: {
    title: "Canal de Denúncias Seguro e Anônimo",
    subtitle: "Proteja sua empresa e seus colaboradores com uma plataforma confiável para denúncias",
    bodyText: "<p>Ofereça um ambiente seguro para seus colaboradores reportarem irregularidades, mantendo a confidencialidade e garantindo que cada denúncia seja tratada com a seriedade necessária.</p>",
    bannerImage: "/images/hero-banner.jpg"
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
  navigation: [
    { id: "1", name: "Início", href: "/" },
    { id: "2", name: "Sobre", href: "/about" },
    { id: "3", name: "Recursos", href: "/features" },
    { id: "4", name: "Preços", href: "/pricing" },
    { id: "5", name: "Fazer Denúncia", href: "/report" },
    { id: "6", name: "Verificar Estado", href: "/check-status" }
  ],
  footer: {
    companyDescription: "Plataforma segura e eficiente para gestão de denúncias empresariais.",
    copyright: "© 2024 Sneaky Complaints. Todos os direitos reservados.",
    socialLinks: {
      facebook: "https://facebook.com/sneakycomplaints",
      twitter: "https://twitter.com/sneakycomplaints",
      instagram: "https://instagram.com/sneakycomplaints",
      linkedin: "https://linkedin.com/company/sneakycomplaints"
    },
    menuGroups: {
      product: [
        { id: "7", name: "Recursos", href: "/features" },
        { id: "8", name: "Preços", href: "/pricing" },
        { id: "9", name: "Casos de Uso", href: "/use-cases" },
        { id: "10", name: "Testemunhos", href: "/testimonials" }
      ],
      company: [
        { id: "11", name: "Sobre Nós", href: "/about" },
        { id: "12", name: "Contato", href: "/contact" }
      ],
      legal: [
        { id: "13", name: "Termos de Serviço", href: "/terms" },
        { id: "14", name: "Política de Privacidade", href: "/privacy" },
        { id: "15", name: "Política de Cookies", href: "/cookies" },
        { id: "16", name: "Proteção de Dados", href: "/data-protection" }
      ]
    }
  }
};
