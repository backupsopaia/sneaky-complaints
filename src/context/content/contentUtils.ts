import { SiteContent } from './types';

// Generate a random ID for new menu items
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Save content to localStorage
export const saveContentToStorage = (content: SiteContent): void => {
  try {
    localStorage.setItem('siteContent', JSON.stringify(content));
  } catch (error) {
    console.error('Error saving content to storage:', error);
  }
};

// Load content from localStorage
export const loadContentFromStorage = (): SiteContent | null => {
  try {
    const savedContent = localStorage.getItem('siteContent');
    return savedContent ? JSON.parse(savedContent) : null;
  } catch (error) {
    console.error('Error loading content from storage:', error);
    return null;
  }
};
