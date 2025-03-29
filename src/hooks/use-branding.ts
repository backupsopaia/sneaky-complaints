import { useContent } from '@/context/content';
import { BrandingConfig } from '@/types/content';

interface UseBrandingReturn {
  branding: BrandingConfig | undefined;
  updateBranding: (newBranding: BrandingConfig) => Promise<void>;
  siteName: string;
  logo: string;
  favicon: string;
}

export const useBranding = (): UseBrandingReturn => {
  const { content, updateContent } = useContent();
  const defaultBranding: BrandingConfig = {
    siteName: 'Sneaky Complaints',
    logo: '/logo.png',
    favicon: '/favicon.ico'
  };

  const branding = content.branding || defaultBranding;

  const updateBranding = async (newBranding: BrandingConfig) => {
    await updateContent({
      ...content,
      branding: newBranding
    });
  };

  return {
    branding,
    updateBranding,
    siteName: branding.siteName,
    logo: branding.logo,
    favicon: branding.favicon
  };
};
