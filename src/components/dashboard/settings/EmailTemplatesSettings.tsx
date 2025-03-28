
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import EmailTemplateEditor from '@/components/shared/email/EmailTemplateEditor';

const EmailTemplatesSettings = () => {
  const { toast } = useToast();
  
  const handleSaveTemplate = (template: any) => {
    // In a real app, this would save to the database
    toast({
      title: "Template de email salvo",
      description: `O template "${template.name}" foi salvo com sucesso.`,
    });
  };
  
  return (
    <EmailTemplateEditor onSave={handleSaveTemplate} />
  );
};

export default EmailTemplatesSettings;
