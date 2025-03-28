
import React, { useState } from 'react';
import { EmailTemplate } from './types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Smartphone, Monitor } from 'lucide-react';

interface TemplatePreviewProps {
  template: EmailTemplate;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [previewValues, setPreviewValues] = useState({
    name: 'João Silva',
    trackingCode: 'DEN-2023-001',
    submissionDate: '01/05/2023',
    newStatus: 'Em Análise',
    comments: 'A denúncia está sendo analisada pela equipe de compliance.',
    loginUrl: 'https://example.com/login',
  });

  const replaceVariables = (content: string): string => {
    let processedContent = content;
    
    Object.entries(previewValues).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedContent = processedContent.replace(regex, value);
    });
    
    return processedContent;
  };
  
  const handleValueChange = (key: string, value: string) => {
    setPreviewValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Visualização do Email</h3>
        <div className="flex items-center space-x-2">
          <Button 
            variant={previewDevice === 'desktop' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setPreviewDevice('desktop')}
            className="gap-1.5"
          >
            <Monitor className="h-4 w-4" />
            <span className="text-xs">Desktop</span>
          </Button>
          <Button 
            variant={previewDevice === 'mobile' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setPreviewDevice('mobile')}
            className="gap-1.5"
          >
            <Smartphone className="h-4 w-4" />
            <span className="text-xs">Mobile</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview">
        <TabsList className="mb-4">
          <TabsTrigger value="preview" className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            <span>Visualizar</span>
          </TabsTrigger>
          <TabsTrigger value="test-data">Dados de Teste</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview">
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="bg-gray-50 border p-3 rounded-md mb-3">
              <strong>Assunto:</strong> {replaceVariables(template.subject)}
            </div>
            
            <div 
              className={`border rounded-md bg-white shadow-sm overflow-hidden ${
                previewDevice === 'mobile' ? 'max-w-[375px] mx-auto' : ''
              }`}
            >
              <div 
                className={`${previewDevice === 'mobile' ? 'p-3 text-sm' : 'p-6'}`}
              >
                <div dangerouslySetInnerHTML={{ __html: replaceVariables(template.content) }} />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="test-data">
          <div className="bg-white rounded-md border p-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure os valores das variáveis para testar como o email aparecerá quando enviado.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(previewValues).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={`preview-${key}`} className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Input
                    id={`preview-${key}`}
                    value={value}
                    onChange={(e) => handleValueChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplatePreview;
