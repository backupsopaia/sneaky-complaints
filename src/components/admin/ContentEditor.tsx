import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Editor } from '@tinymce/tinymce-react';
import { ImageUpload } from './ImageUpload';
import { SliderEditor } from './SliderEditor';
import { BannerEditor } from './BannerEditor';
import { useContent } from '@/context/content';
import { tinyMCEConfig } from '@/config/tinymce';
import { 
  Save, 
  Image as ImageIcon, 
  SlidersHorizontal, 
  Layout,
  FileText,
  Globe,
  Mail
} from 'lucide-react';

const ContentEditor = () => {
  const { toast } = useToast();
  const { content, updateContent } = useContent();
  const [activeTab, setActiveTab] = useState('text');
  const [selectedSection, setSelectedSection] = useState('home');
  const [editingContent, setEditingContent] = useState(content);

  const handleTextChange = (section: string, field: string, value: string) => {
    setEditingContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
      await updateContent(editingContent);
      toast({
        title: "Sucesso",
        description: "Conteúdo atualizado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o conteúdo.",
        variant: "destructive",
      });
    }
  };

  const sections = [
    { id: 'home', label: 'Página Inicial', icon: <Globe className="w-4 h-4" /> },
    { id: 'about', label: 'Sobre', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: 'Contato', icon: <Mail className="w-4 h-4" /> },
    { id: 'footer', label: 'Rodapé', icon: <Layout className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Editor de Conteúdo</h2>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="text">
            <FileText className="w-4 h-4 mr-2" />
            Textos
          </TabsTrigger>
          <TabsTrigger value="images">
            <ImageIcon className="w-4 h-4 mr-2" />
            Imagens
          </TabsTrigger>
          <TabsTrigger value="sliders">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Sliders
          </TabsTrigger>
          <TabsTrigger value="banners">
            <Layout className="w-4 h-4 mr-2" />
            Banners
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 grid grid-cols-4 gap-6">
          {/* Sidebar de Seções */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Seções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={selectedSection === section.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedSection(section.id)}
                  >
                    {section.icon}
                    <span className="ml-2">{section.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Área de Edição */}
          <Card className="col-span-3">
            <CardContent className="pt-6">
              <TabsContent value="text">
                {editingContent[selectedSection] && Object.entries(editingContent[selectedSection]).map(([field, value]) => (
                  <div key={field} className="mb-6">
                    <Label className="mb-2 block capitalize">
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <Editor
                      apiKey="your-tinymce-api-key"
                      value={value as string}
                      init={tinyMCEConfig}
                      onEditorChange={(value) => handleTextChange(selectedSection, field, value)}
                    />
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="images">
                <ImageUpload 
                  section={selectedSection}
                  images={editingContent[selectedSection]?.images || []}
                  onUpdate={(images) => handleTextChange(selectedSection, 'images', images)}
                />
              </TabsContent>

              <TabsContent value="sliders">
                <SliderEditor
                  section={selectedSection}
                  sliders={editingContent[selectedSection]?.sliders || []}
                  onUpdate={(sliders) => handleTextChange(selectedSection, 'sliders', sliders)}
                />
              </TabsContent>

              <TabsContent value="banners">
                <BannerEditor
                  section={selectedSection}
                  banners={editingContent[selectedSection]?.banners || []}
                  onUpdate={(banners) => handleTextChange(selectedSection, 'banners', banners)}
                />
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
};

export default ContentEditor;
