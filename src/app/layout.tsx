import React from 'react';
import { Metadata } from 'next';
import { AuthProvider } from '@/context/auth';
import { ContentProvider } from '@/context/content';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/context/theme';
import { useBranding } from '@/hooks/use-branding';

export const metadata: Metadata = {
  title: 'Sneaky Complaints',
  description: 'Sua plataforma segura para denúncias anônimas',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { siteName, favicon } = useBranding();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href={favicon}
        />
        <title>{siteName}</title>
        <meta
          name="description"
          content={metadata.description}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ContentProvider>
              {children}
              <Toaster />
            </ContentProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
