
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, FileEdit, Eye } from "lucide-react";
import RichTextEditor from '@/components/admin/content/RichTextEditor';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

interface EmailTemplateEditorProps {
  templates?: EmailTemplate[];
  onSave?: (template: EmailTemplate) => void;
}

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

const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = ({ templates = defaultTemplates, onSave }) => {
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

  const renderPlaceholderHelp = () => (
    <div className="bg-gray-50 border border-gray-100 rounded-md p-4 mt-4">
      <h4 className="text-sm font-medium mb-2">Variáveis disponíveis:</h4>
      <ul className="text-sm space-y-1">
        <li><code>{{'{{'}}name{{'}}'}}</code> - Nome do destinatário</li>
        <li><code>{{'{{'}}trackingCode{{'}}'}}</code> - Código de rastreamento da denúncia</li>
        <li><code>{{'{{'}}submissionDate{{'}}'}}</code> - Data de submissão</li>
        <li><code>{{'{{'}}newStatus{{'}}'}}</code> - Novo status da denúncia</li>
        <li><code>{{'{{'}}comments{{'}}'}}</code> - Comentários adicionais</li>
        <li><code>{{'{{'}}loginUrl{{'}}'}}</code> - URL de login</li>
      </ul>
    </div>
  );

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
          <div>
            <Label>Selecione o Template</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant={activeTemplateId === template.id ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleTemplateChange(template.id)}
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>

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
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto do Email</Label>
                <Input
                  id="subject"
                  value={editedTemplate.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo HTML do Email</Label>
                <RichTextEditor 
                  initialValue={editedTemplate.content}
                  onChange={(value) => handleInputChange('content', value)}
                />
              </div>
              
              {renderPlaceholderHelp()}
            </TabsContent>
            
            <TabsContent value="preview" className="pt-4">
              <div className="space-y-4">
                <div className="bg-gray-50 border p-3 rounded-md">
                  <strong>Assunto:</strong> {editedTemplate.subject}
                </div>
                <div className="border rounded-md p-4 bg-white">
                  <div dangerouslySetInnerHTML={{ __html: editedTemplate.content }} />
                </div>
              </div>
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
