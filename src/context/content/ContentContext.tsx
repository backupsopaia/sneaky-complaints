
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ContentSection {
  title: string;
  subtitle: string;
  bodyText: string;
  bannerImage: string;
  customNotification: string;
}

interface MenuItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
}

interface FooterSection {
  companyDescription: string;
  copyright: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  menuGroups: {
    product: MenuItem[];
    company: MenuItem[];
    legal: MenuItem[];
  };
}

interface SiteContent {
  homepage: ContentSection;
  login: ContentSection;
  dashboard: ContentSection;
  navigation: MenuItem[];
  footer: FooterSection;
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, data: Partial<ContentSection | MenuItem[] | FooterSection>) => void;
  addMenuItem: (section: 'navigation' | 'product' | 'company' | 'legal', item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (section: 'navigation' | 'product' | 'company' | 'legal', itemId: string) => void;
  updateMenuItem: (section: 'navigation' | 'product' | 'company' | 'legal', itemId: string, data: Partial<MenuItem>) => void;
  updateSocialLink: (platform: keyof FooterSection['socialLinks'], url: string) => void;
  updateFooterText: (field: 'companyDescription' | 'copyright', text: string) => void;
  isLoading: boolean;
}

const defaultFooter: FooterSection = {
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

const defaultNavigation: MenuItem[] = [
  { id: 'home', label: 'Início', url: '/' },
  { id: 'features', label: 'Recursos', url: '#features' },
  { id: 'pricing', label: 'Preços', url: '#pricing' },
  { id: 'report', label: 'Fazer Denúncia', url: '/report' },
  { id: 'check', label: 'Verificar Status', url: '/check-status' }
];

const defaultContent: SiteContent = {
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

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  updateContent: () => {},
  addMenuItem: () => {},
  removeMenuItem: () => {},
  updateMenuItem: () => {},
  updateSocialLink: () => {},
  updateFooterText: () => {},
  isLoading: true
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  // Simula carregamento do conteúdo salvo
  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent');
    
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error('Erro ao carregar conteúdo salvo:', e);
      }
    }
    
    setIsLoading(false);
  }, []);

  const updateContent = (section: keyof SiteContent, data: Partial<any>) => {
    setContent(prev => {
      const updatedContent = {
        ...prev,
        [section]: {
          ...prev[section],
          ...data
        }
      };
      
      // Salva no localStorage
      localStorage.setItem('siteContent', JSON.stringify(updatedContent));
      
      return updatedContent;
    });
  };

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const addMenuItem = (section: 'navigation' | 'product' | 'company' | 'legal', item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      id: generateId(),
      ...item
    };

    setContent(prev => {
      let updatedContent;

      if (section === 'navigation') {
        updatedContent = {
          ...prev,
          navigation: [...prev.navigation, newItem]
        };
      } else {
        updatedContent = {
          ...prev,
          footer: {
            ...prev.footer,
            menuGroups: {
              ...prev.footer.menuGroups,
              [section]: [...prev.footer.menuGroups[section as keyof typeof prev.footer.menuGroups], newItem]
            }
          }
        };
      }

      localStorage.setItem('siteContent', JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  const removeMenuItem = (section: 'navigation' | 'product' | 'company' | 'legal', itemId: string) => {
    setContent(prev => {
      let updatedContent;

      if (section === 'navigation') {
        updatedContent = {
          ...prev,
          navigation: prev.navigation.filter(item => item.id !== itemId)
        };
      } else {
        updatedContent = {
          ...prev,
          footer: {
            ...prev.footer,
            menuGroups: {
              ...prev.footer.menuGroups,
              [section]: prev.footer.menuGroups[section as keyof typeof prev.footer.menuGroups].filter(item => item.id !== itemId)
            }
          }
        };
      }

      localStorage.setItem('siteContent', JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  const updateMenuItem = (section: 'navigation' | 'product' | 'company' | 'legal', itemId: string, data: Partial<MenuItem>) => {
    setContent(prev => {
      let updatedContent;

      if (section === 'navigation') {
        updatedContent = {
          ...prev,
          navigation: prev.navigation.map(item => 
            item.id === itemId ? { ...item, ...data } : item
          )
        };
      } else {
        updatedContent = {
          ...prev,
          footer: {
            ...prev.footer,
            menuGroups: {
              ...prev.footer.menuGroups,
              [section]: prev.footer.menuGroups[section as keyof typeof prev.footer.menuGroups].map(item => 
                item.id === itemId ? { ...item, ...data } : item
              )
            }
          }
        };
      }

      localStorage.setItem('siteContent', JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  const updateSocialLink = (platform: keyof FooterSection['socialLinks'], url: string) => {
    setContent(prev => {
      const updatedContent = {
        ...prev,
        footer: {
          ...prev.footer,
          socialLinks: {
            ...prev.footer.socialLinks,
            [platform]: url
          }
        }
      };

      localStorage.setItem('siteContent', JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  const updateFooterText = (field: 'companyDescription' | 'copyright', text: string) => {
    setContent(prev => {
      const updatedContent = {
        ...prev,
        footer: {
          ...prev.footer,
          [field]: text
        }
      };

      localStorage.setItem('siteContent', JSON.stringify(updatedContent));
      return updatedContent;
    });
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      addMenuItem, 
      removeMenuItem, 
      updateMenuItem,
      updateSocialLink,
      updateFooterText,
      isLoading 
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
