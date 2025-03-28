
export interface ContentSection {
  title: string;
  subtitle: string;
  bodyText: string;
  bannerImage: string;
  customNotification: string;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  icon?: string;
}

export interface FooterSection {
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

export interface SiteContent {
  homepage: ContentSection;
  login: ContentSection;
  dashboard: ContentSection;
  navigation: MenuItem[];
  footer: FooterSection;
}

export interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, data: Partial<ContentSection | MenuItem[] | FooterSection>) => void;
  addMenuItem: (section: 'navigation' | 'product' | 'company' | 'legal', item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (section: 'navigation' | 'product' | 'company' | 'legal', itemId: string) => void;
  updateMenuItem: (section: 'navigation' | 'product' | 'company' | 'legal', itemId: string, data: Partial<MenuItem>) => void;
  updateSocialLink: (platform: keyof FooterSection['socialLinks'], url: string) => void;
  updateFooterText: (field: 'companyDescription' | 'copyright', text: string) => void;
  isLoading: boolean;
}
