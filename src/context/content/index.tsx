import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { SiteContent, MenuItem, ImageItem, SlideItem, BannerItem } from '@/types/content';

interface ContentContextData {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  addMenuItem: (section: 'navigation' | 'product' | 'company' | 'legal', item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (section: 'navigation' | 'product' | 'company' | 'legal', itemId: string) => void;
  updateMenuItem: (section: 'navigation' | 'product' | 'company' | 'legal', itemId: string, data: Partial<MenuItem>) => void;
}

const defaultContent: SiteContent = {
  home: {
    hero: {
      title: 'Bem-vindo ao Sneaky Complaints',
      subtitle: 'Faça denúncias de forma segura e anônima',
      description: 'Nossa plataforma oferece um ambiente seguro para você reportar irregularidades sem medo de retaliação.',
      buttonText: 'Faça uma Denúncia',
      buttonUrl: '/report'
    },
    features: [
      {
        title: 'Anonimato Garantido',
        description: 'Sua identidade é protegida em todas as etapas do processo.'
      },
      {
        title: 'Acompanhamento em Tempo Real',
        description: 'Monitore o status da sua denúncia a qualquer momento.'
      },
      {
        title: 'Comunicação Segura',
        description: 'Canal de comunicação criptografado entre você e os investigadores.'
      }
    ],
    sliders: [],
    banners: []
  },
  about: {
    title: 'Sobre Nós',
    content: 'Somos uma plataforma dedicada a promover transparência e integridade nas organizações.',
    mission: 'Nossa missão é criar um ambiente mais seguro e ético para todos.',
    vision: 'Buscamos ser a principal referência em sistemas de denúncias anônimas.',
    images: []
  },
  contact: {
    title: 'Entre em Contato',
    content: 'Estamos aqui para ajudar. Entre em contato conosco para mais informações.',
    email: 'contato@sneakycomplaints.com',
    phone: '+55 (11) 1234-5678',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    banners: []
  },
  footer: {
    company: 'Sneaky Complaints',
    description: 'Plataforma líder em denúncias anônimas',
    socialLinks: [
      { name: 'LinkedIn', url: '#' },
      { name: 'Twitter', url: '#' },
      { name: 'Facebook', url: '#' }
    ],
    links: [
      { text: 'Política de Privacidade', url: '/privacy' },
      { text: 'Termos de Uso', url: '/terms' },
      { text: 'FAQ', url: '/faq' }
    ]
  },
  navigation: [],
  product: [],
  company: [],
  legal: []
};

const ContentContext = createContext<ContentContextData>({} as ContentContextData);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSuperAdmin } = useAuth();
  const [content, setContent] = useState<SiteContent>(() => {
    const savedContent = localStorage.getItem('@SneakyComplaints:content');
    return savedContent ? JSON.parse(savedContent) : defaultContent;
  });

  useEffect(() => {
    localStorage.setItem('@SneakyComplaints:content', JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: SiteContent) => {
    if (!isSuperAdmin) {
      throw new Error('Apenas super administradores podem editar o conteúdo');
    }

    setContent(newContent);
  };

  const addMenuItem = (section: 'navigation' | 'product' | 'company' | 'legal', item: Omit<MenuItem, 'id'>) => {
    if (!isSuperAdmin) {
      throw new Error('Apenas super administradores podem adicionar itens ao menu');
    }

    const newItem: MenuItem = {
      ...item,
      id: crypto.randomUUID()
    };

    setContent(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeMenuItem = (section: 'navigation' | 'product' | 'company' | 'legal', itemId: string) => {
    if (!isSuperAdmin) {
      throw new Error('Apenas super administradores podem remover itens do menu');
    }

    setContent(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== itemId)
    }));
  };

  const updateMenuItem = (
    section: 'navigation' | 'product' | 'company' | 'legal',
    itemId: string,
    data: Partial<MenuItem>
  ) => {
    if (!isSuperAdmin) {
      throw new Error('Apenas super administradores podem editar itens do menu');
    }

    setContent(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === itemId ? { ...item, ...data } : item
      )
    }));
  };

  return (
    <ContentContext.Provider 
      value={{ 
        content, 
        updateContent,
        addMenuItem,
        removeMenuItem,
        updateMenuItem
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }

  return context;
};
