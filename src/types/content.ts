export interface MenuItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  description?: string;
  external?: boolean;
}

export interface ImageItem {
  id: string;
  url: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface SlideItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface BannerItem {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'error' | 'success';
  dismissible?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface BrandingConfig {
  siteName: string;
  logo: string;
  favicon: string;
}

export interface ContentSection {
  title: string;
  subtitle?: string;
  description: string;
  images: ImageItem[];
  sliders: SlideItem[];
  banners: BannerItem[];
}

export interface SiteContent {
  home: ContentSection;
  about: ContentSection;
  contact: ContentSection;
  footer: ContentSection;
  navigation: MenuItem[];
  product: MenuItem[];
  company: MenuItem[];
  legal: MenuItem[];
  branding?: BrandingConfig;
}
