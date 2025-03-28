
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EmailTemplate } from './types';

interface TemplateSelectorProps {
  templates: EmailTemplate[];
  activeTemplateId: string;
  onTemplateChange: (id: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  activeTemplateId,
  onTemplateChange,
}) => {
  return (
    <div>
      <Label>Selecione o Template</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
        {templates.map((template) => (
          <Button
            key={template.id}
            variant={activeTemplateId === template.id ? "default" : "outline"}
            className="justify-start"
            onClick={() => onTemplateChange(template.id)}
          >
            {template.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
