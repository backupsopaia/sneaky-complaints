import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

interface BannerEditorProps {
  section: string;
  banners: Array<{
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
    image: {
      id: string;
      url: string;
      alt: string;
      title: string;
    };
    backgroundColor?: string;
    textColor?: string;
  }>;
  onUpdate: (banners: any[]) => void;
}

export const BannerEditor: React.FC<BannerEditorProps> = ({ section, banners, onUpdate }) => {
  const handleAddBanner = () => {
    const newBanner = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Novo Banner',
      subtitle: 'Subtítulo do banner',
      description: 'Descrição do banner',
      buttonText: 'Saiba Mais',
      buttonUrl: '#',
      image: {
        id: Math.random().toString(36).substr(2, 9),
        url: '',
        alt: '',
        title: ''
      },
      backgroundColor: '#ffffff',
      textColor: '#000000'
    };
    onUpdate([...banners, newBanner]);
  };

  const handleRemoveBanner = (id: string) => {
    onUpdate(banners.filter(banner => banner.id !== id));
  };

  const handleUpdateBanner = (id: string, field: string, value: any) => {
    onUpdate(banners.map(banner =>
      banner.id === id ? { ...banner, [field]: value } : banner
    ));
  };

  return (
    <div className="space-y-6">
      <Button onClick={handleAddBanner}>
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Banner
      </Button>

      <div className="space-y-6">
        {banners.map((banner, index) => (
          <Card key={banner.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Banner {index + 1}</h3>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleRemoveBanner(banner.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`title-${banner.id}`}>Título</Label>
                  <Input
                    id={`title-${banner.id}`}
                    value={banner.title}
                    onChange={(e) => handleUpdateBanner(banner.id, 'title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`subtitle-${banner.id}`}>Subtítulo</Label>
                  <Input
                    id={`subtitle-${banner.id}`}
                    value={banner.subtitle}
                    onChange={(e) => handleUpdateBanner(banner.id, 'subtitle', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`description-${banner.id}`}>Descrição</Label>
                  <Textarea
                    id={`description-${banner.id}`}
                    value={banner.description}
                    onChange={(e) => handleUpdateBanner(banner.id, 'description', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`buttonText-${banner.id}`}>Texto do Botão</Label>
                  <Input
                    id={`buttonText-${banner.id}`}
                    value={banner.buttonText}
                    onChange={(e) => handleUpdateBanner(banner.id, 'buttonText', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`buttonUrl-${banner.id}`}>URL do Botão</Label>
                  <Input
                    id={`buttonUrl-${banner.id}`}
                    value={banner.buttonUrl}
                    onChange={(e) => handleUpdateBanner(banner.id, 'buttonUrl', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`backgroundColor-${banner.id}`}>Cor de Fundo</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id={`backgroundColor-${banner.id}`}
                        value={banner.backgroundColor}
                        onChange={(e) => handleUpdateBanner(banner.id, 'backgroundColor', e.target.value)}
                        className="w-12 h-12 p-1"
                      />
                      <Input
                        type="text"
                        value={banner.backgroundColor}
                        onChange={(e) => handleUpdateBanner(banner.id, 'backgroundColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`textColor-${banner.id}`}>Cor do Texto</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id={`textColor-${banner.id}`}
                        value={banner.textColor}
                        onChange={(e) => handleUpdateBanner(banner.id, 'textColor', e.target.value)}
                        className="w-12 h-12 p-1"
                      />
                      <Input
                        type="text"
                        value={banner.textColor}
                        onChange={(e) => handleUpdateBanner(banner.id, 'textColor', e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label>Imagem do Banner</Label>
                <ImageUpload
                  section={`banner-${banner.id}`}
                  images={[banner.image]}
                  onUpdate={(images) => handleUpdateBanner(banner.id, 'image', images[0])}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
