import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDropzone } from 'react-dropzone';
import { useToast } from "@/hooks/use-toast";
import { useBranding } from '@/hooks/use-branding';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { BrandingConfig } from '@/types/content';

const BrandingEditor = () => {
  const { toast } = useToast();
  const { branding: defaultBranding, updateBranding } = useBranding();
  const [branding, setBranding] = useState<BrandingConfig>({
    siteName: defaultBranding?.siteName || 'Sneaky Complaints',
    logo: defaultBranding?.logo || '',
    favicon: defaultBranding?.favicon || ''
  });

  const handleImageUpload = async (files: File[], type: 'logo' | 'favicon') => {
    if (files.length === 0) return;

    const file = files[0];
    if (!file.type.includes('image/')) {
      toast({
        title: "Erro",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive"
      });
      return;
    }

    // Em produção, aqui você faria o upload para um servidor
    const reader = new FileReader();
    reader.onloadend = () => {
      setBranding(prev => ({
        ...prev,
        [type]: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const logoDropzone = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg']
    },
    maxFiles: 1,
    onDrop: (files) => handleImageUpload(files, 'logo')
  });

  const faviconDropzone = useDropzone({
    accept: {
      'image/*': ['.ico', '.png', '.svg']
    },
    maxFiles: 1,
    onDrop: (files) => handleImageUpload(files, 'favicon')
  });

  const handleSave = async () => {
    try {
      updateBranding(branding);
      
      toast({
        title: "Sucesso",
        description: "Configurações de marca atualizadas com sucesso.",
      });

      // Em produção, aqui você atualizaria o favicon e o logo dinamicamente
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon && branding.favicon) {
        favicon.setAttribute('href', branding.favicon);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar as configurações.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Marca</CardTitle>
        <CardDescription>
          Personalize o nome do site, logo e favicon
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="siteName">Nome do Site</Label>
          <Input
            id="siteName"
            value={branding.siteName}
            onChange={(e) => setBranding(prev => ({ ...prev, siteName: e.target.value }))}
            placeholder="Nome do site"
          />
        </div>

        <div className="space-y-2">
          <Label>Logo</Label>
          <div
            {...logoDropzone.getRootProps()}
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
          >
            <input {...logoDropzone.getInputProps()} />
            {branding.logo ? (
              <div className="space-y-4">
                <img
                  src={branding.logo}
                  alt="Logo Preview"
                  className="max-h-32 mx-auto"
                />
                <p className="text-sm text-muted-foreground">
                  Arraste uma nova imagem ou clique para substituir
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                <p>Arraste e solte o logo aqui ou clique para selecionar</p>
                <p className="text-sm text-muted-foreground">
                  SVG, PNG ou JPG (recomendado: 120x120px)
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Favicon</Label>
          <div
            {...faviconDropzone.getRootProps()}
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
          >
            <input {...faviconDropzone.getInputProps()} />
            {branding.favicon ? (
              <div className="space-y-4">
                <img
                  src={branding.favicon}
                  alt="Favicon Preview"
                  className="max-h-16 mx-auto"
                />
                <p className="text-sm text-muted-foreground">
                  Arraste uma nova imagem ou clique para substituir
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground" />
                <p>Arraste e solte o favicon aqui ou clique para selecionar</p>
                <p className="text-sm text-muted-foreground">
                  ICO, PNG ou SVG (recomendado: 32x32px)
                </p>
              </div>
            )}
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
};

export default BrandingEditor;
