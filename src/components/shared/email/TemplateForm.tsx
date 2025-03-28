
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from '@/components/admin/content/RichTextEditor';
import TemplatePlaceholderHelp from './TemplatePlaceholderHelp';
import { EmailTemplate } from './types';

interface TemplateFormProps {
  template: EmailTemplate;
  onInputChange: (field: keyof EmailTemplate, value: string) => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  template,
  onInputChange,
}) => {
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
        />
      </div>
      
      <TemplatePlaceholderHelp />
    </div>
  );
};

export default TemplateForm;
