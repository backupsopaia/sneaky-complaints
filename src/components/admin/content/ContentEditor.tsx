import React, { useState } from 'react';
import { SaveIcon, Image, AlignCenter, Upload, LayoutDashboard, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from '@/components/admin/content/ImageUploader';
import RichTextEditor from '@/components/admin/content/RichTextEditor';
import { useContent, ContentSection } from '@/context/content';
import BrandingEditor from './BrandingEditor';

interface ContentEditorProps {
  section: 'homepage' | 'login' | 'dashboard' | 'branding';
}

const ContentEditor: React.FC<ContentEditorProps> = ({ section }) => {
  const { toast } = useToast();
  const { content, updateContent } = useContent();
  const [activeTab, setActiveTab] = useState("text");
  const [saving, setSaving] = useState(false);
  
  const [localContent, setLocalContent] = useState<ContentSection>(
    content[section as keyof typeof content] as ContentSection
  );

  const handleSave = () => {
    setSaving(true);
    
    updateContent(section as keyof typeof content, localContent);
    
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Conteúdo guardado",
        description: `As alterações foram guardadas com sucesso.`,
      });
    }, 800);
  };

  const handleTextChange = (field: string, value: string) => {
    setLocalContent(prev => ({ ...prev, [field]: value }));
  };

  const getSectionTitle = () => {
    switch (section) {
      case 'homepage':
        return 'Página Inicial';
      case 'login':
        return 'Página de Login';
      case 'dashboard':
        return 'Painel de Controlo';
      case 'branding':
        return 'Marca';
      default:
        return 'Conteúdo';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {section === 'branding' ? (
            <Palette className="h-5 w-5 text-primary" />
          ) : (
            <LayoutDashboard className="h-5 w-5 text-primary" />
          )}
          <div>
            <CardTitle>Editor de Conteúdo - {getSectionTitle()}</CardTitle>
            <CardDescription>
              {section === 'branding' 
                ? 'Personalize o logo, favicon e nome do site'
                : `Personalize o conteúdo que aparece na ${getSectionTitle().toLowerCase()} do sistema`
              }
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {section === 'branding' ? (
          <BrandingEditor />
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="text">
                  <AlignCenter className="h-4 w-4 mr-2" />
                  Textos
                </TabsTrigger>
                <TabsTrigger value="images">
                  <Image className="h-4 w-4 mr-2" />
                  Imagens
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Upload className="h-4 w-4 mr-2" />
                  Notificações
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={localContent.title}
                      onChange={(e) => handleTextChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtítulo</Label>
                    <Input
                      id="subtitle"
                      value={localContent.subtitle}
                      onChange={(e) => handleTextChange('subtitle', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bodyText">Texto Principal</Label>
                    <RichTextEditor 
                      initialValue={localContent.bodyText}
                      onChange={(value) => handleTextChange('bodyText', value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="images">
                  <ImageUploader 
                    currentImage={localContent.bannerImage}
                    onImageChange={(url) => handleTextChange('bannerImage', url)}
                    label="Imagem de Banner"
                  />
                </TabsContent>
                
                <TabsContent value="notifications">
                  <div className="space-y-2">
                    <Label htmlFor="notification">Mensagem de Notificação</Label>
                    <Textarea
                      id="notification"
                      value={localContent.customNotification}
                      onChange={(e) => handleTextChange('customNotification', e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-sm text-gray-500">
                      Esta mensagem será exibida aos utilizadores quando acederem ao sistema.
                    </p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </>
        )}
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="ml-auto flex items-center"
        >
          <SaveIcon className="h-4 w-4 mr-2" />
          {saving ? 'A guardar...' : 'Guardar Alterações'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentEditor;
