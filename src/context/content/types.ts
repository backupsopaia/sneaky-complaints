export interface ContentSection {
  title: string;
  subtitle: string;
  bodyText: string;
  bannerImage: string;
  customNotification: string;
}

export interface MenuItem {
  id: string;
  name: string;
  href: string;
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

export interface HomepageContent {
  title: string;
  subtitle: string;
  bodyText: string;
  bannerImage: string;
}

export interface SiteContent {
  homepage: HomepageContent;
  navigation: MenuItem[];
  footer: FooterSection;
}

export interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
}
