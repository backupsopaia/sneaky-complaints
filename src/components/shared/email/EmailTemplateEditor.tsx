
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, FileEdit, Eye } from "lucide-react";
import TemplateSelector from './TemplateSelector';
import TemplateForm from './TemplateForm';
import TemplatePreview from './TemplatePreview';
import { EmailTemplate } from './types';

const defaultTemplates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Boas-vindas',
    subject: 'Bem-vindo ao Canal de Denúncias',
    content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Bem-vindo ao Canal de Denúncias</h2>
      <p>Olá {{name}},</p>
      <p>Bem-vindo ao nosso Canal de Denúncias. A sua conta foi criada com sucesso.</p>
      <p>O Canal de Denúncias é uma ferramenta segura e confidencial para reportar comportamentos que violem o nosso Código de Ética e Conduta.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Acesse sua conta:</strong> <a href="{{loginUrl}}" style="color: #0066cc;">Clique aqui</a></p>
      </div>
      <p>Em caso de dúvidas, entre em contato com o nosso suporte.</p>
      <p>Atenciosamente,<br>Equipe de Compliance</p>
    </div>`
  },
  {
    id: 'report_confirmation',
    name: 'Confirmação de Denúncia',
    subject: 'Confirmação da sua Denúncia',
    content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Recebemos a sua Denúncia</h2>
      <p>Olá,</p>
      <p>A sua denúncia foi recebida com sucesso e será analisada pela nossa equipe de Compliance.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Código de rastreamento:</strong> {{trackingCode}}</p>
        <p style="margin: 10px 0 0;"><strong>Data de submissão:</strong> {{submissionDate}}</p>
      </div>
      <p>Você pode acompanhar o status da sua denúncia utilizando o código de rastreamento acima.</p>
      <p>Atenciosamente,<br>Equipe de Compliance</p>
    </div>`
  },
  {
    id: 'status_update',
    name: 'Atualização de Status',
    subject: 'Atualização do Status da sua Denúncia',
    content: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Atualização da sua Denúncia</h2>
      <p>Olá,</p>
      <p>O status da sua denúncia com o código {{trackingCode}} foi atualizado.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Novo status:</strong> {{newStatus}}</p>
        <p style="margin: 10px 0 0;"><strong>Comentários:</strong> {{comments}}</p>
      </div>
      <p>Se tiver alguma dúvida, entre em contato com o nosso suporte.</p>
      <p>Atenciosamente,<br>Equipe de Compliance</p>
    </div>`
  }
];

interface EmailTemplateEditorProps {
  templates?: EmailTemplate[];
  onSave?: (template: EmailTemplate) => void;
}

const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({ 
  templates = defaultTemplates, 
  onSave 
}) => {
  const { toast } = useToast();
  const [activeTemplateId, setActiveTemplateId] = useState(templates[0]?.id || '');
  const [currentView, setCurrentView] = useState<'edit' | 'preview'>('edit');
  const [editedTemplate, setEditedTemplate] = useState<EmailTemplate>(templates[0] || defaultTemplates[0]);

  const handleTemplateChange = (id: string) => {
    const template = templates.find(t => t.id === id) || defaultTemplates.find(t => t.id === id);
    if (template) {
      setActiveTemplateId(id);
      setEditedTemplate(template);
    }
  };

  const handleInputChange = (field: keyof EmailTemplate, value: string) => {
    setEditedTemplate(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedTemplate);
    }
    
    toast({
      title: "Template salvo",
      description: `O template "${editedTemplate.name}" foi salvo com sucesso.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Modelos de Email</CardTitle>
            <CardDescription>
              Configure os templates de email que serão enviados
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <TemplateSelector
            templates={templates}
            activeTemplateId={activeTemplateId}
            onTemplateChange={handleTemplateChange}
          />

          <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as 'edit' | 'preview')}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{editedTemplate.name}</h3>
              <TabsList>
                <TabsTrigger value="edit" className="flex items-center gap-1">
                  <FileEdit className="h-4 w-4" />
                  <span>Editar</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>Visualizar</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="edit" className="space-y-4 pt-4">
              <TemplateForm 
                template={editedTemplate} 
                onInputChange={handleInputChange} 
              />
            </TabsContent>
            
            <TabsContent value="preview" className="pt-4">
              <TemplatePreview template={editedTemplate} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button onClick={handleSave} className="ml-auto">
          Guardar Template
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailTemplateEditor;
