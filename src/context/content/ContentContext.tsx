
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ContentSection {
  title: string;
  subtitle: string;
  bodyText: string;
  bannerImage: string;
  customNotification: string;
}

interface SiteContent {
  homepage: ContentSection;
  login: ContentSection;
  dashboard: ContentSection;
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, data: Partial<ContentSection>) => void;
  isLoading: boolean;
}

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
  }
};

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  updateContent: () => {},
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

  const updateContent = (section: keyof SiteContent, data: Partial<ContentSection>) => {
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

  return (
    <ContentContext.Provider value={{ content, updateContent, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
