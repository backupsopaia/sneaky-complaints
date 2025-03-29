import React, { createContext, useContext, useState, ReactNode } from 'react';
import { defaultContent } from './defaultContent';
import { SiteContent, ContentContextType } from './types';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent(prevContent => ({
      ...prevContent,
      ...newContent
    }));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent deve ser usado dentro de um ContentProvider');
  }
  return context;
}
