
import React, { createContext, useState, useEffect } from 'react';
import { ContentContextType, SiteContent, MenuItem, FooterSection } from './types';
import { defaultContent } from './defaultContent';
import { generateId, saveContentToStorage, loadContentFromStorage } from './contentUtils';

export { ContentSection } from './types';

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

  // Load saved content from localStorage on initial render
  useEffect(() => {
    const savedContent = loadContentFromStorage();
    
    if (savedContent) {
      setContent(savedContent);
    }
    
    setIsLoading(false);
  }, []);

  // Update content for a specific section
  const updateContent = (section: keyof SiteContent, data: Partial<any>) => {
    setContent(prev => {
      const updatedContent = {
        ...prev,
        [section]: {
          ...prev[section],
          ...data
        }
      };
      
      saveContentToStorage(updatedContent);
      return updatedContent;
    });
  };

  // Add a new menu item to navigation or footer menu groups
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

      saveContentToStorage(updatedContent);
      return updatedContent;
    });
  };

  // Remove a menu item from navigation or footer menu groups
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

      saveContentToStorage(updatedContent);
      return updatedContent;
    });
  };

  // Update a menu item in navigation or footer menu groups
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

      saveContentToStorage(updatedContent);
      return updatedContent;
    });
  };

  // Update a social link in the footer
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

      saveContentToStorage(updatedContent);
      return updatedContent;
    });
  };

  // Update footer text (company description or copyright)
  const updateFooterText = (field: 'companyDescription' | 'copyright', text: string) => {
    setContent(prev => {
      const updatedContent = {
        ...prev,
        footer: {
          ...prev.footer,
          [field]: text
        }
      };

      saveContentToStorage(updatedContent);
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

export { useContent } from './useContent';
