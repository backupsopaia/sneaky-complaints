
// Generate a random ID for new menu items
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Save content to localStorage
export const saveContentToStorage = (content: any): void => {
  localStorage.setItem('siteContent', JSON.stringify(content));
};

// Load content from localStorage
export const loadContentFromStorage = (): any | null => {
  const savedContent = localStorage.getItem('siteContent');
  if (savedContent) {
    try {
      return JSON.parse(savedContent);
    } catch (e) {
      console.error('Erro ao carregar conteúdo salvo:', e);
      return null;
    }
  }
  return null;
};
