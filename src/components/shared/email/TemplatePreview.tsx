
import React from 'react';
import { EmailTemplate } from './types';

interface TemplatePreviewProps {
  template: EmailTemplate;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 border p-3 rounded-md">
        <strong>Assunto:</strong> {template.subject}
      </div>
      <div className="border rounded-md p-4 bg-white">
        <div dangerouslySetInnerHTML={{ __html: template.content }} />
      </div>
    </div>
  );
};

export default TemplatePreview;
