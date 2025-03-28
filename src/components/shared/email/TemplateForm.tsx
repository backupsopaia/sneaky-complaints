
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from '@/components/admin/content/RichTextEditor';
import TemplatePlaceholderHelp, { TemplatePlaceholder } from './TemplatePlaceholderHelp';
import { EmailTemplate } from './types';

interface TemplateFormProps {
  template: EmailTemplate;
  onInputChange: (field: keyof EmailTemplate, value: string) => void;
  placeholders?: TemplatePlaceholder[];
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  template,
  onInputChange,
  placeholders,
}) => {
  const emailPlaceholders = placeholders || [
    { name: 'name', description: 'Nome do destinatário' },
    { name: 'trackingCode', description: 'Código de rastreamento da denúncia' },
    { name: 'submissionDate', description: 'Data de submissão' },
    { name: 'newStatus', description: 'Novo status da denúncia' },
    { name: 'comments', description: 'Comentários adicionais' },
    { name: 'loginUrl', description: 'URL de login' },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject">Assunto do Email</Label>
        <Input
          id="subject"
          value={template.subject}
          onChange={(e) => onInputChange('subject', e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo HTML do Email</Label>
        <RichTextEditor 
          initialValue={template.content}
          onChange={(value) => onInputChange('content', value)}
          showVariablesButton={true}
          availableVariables={emailPlaceholders}
        />
      </div>
      
      <TemplatePlaceholderHelp placeholders={emailPlaceholders} />
    </div>
  );
};

export default TemplateForm;
