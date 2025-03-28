
import React from 'react';

const TemplatePlaceholderHelp: React.FC = () => {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-md p-4 mt-4">
      <h4 className="text-sm font-medium mb-2">Variáveis disponíveis:</h4>
      <ul className="text-sm space-y-1">
        <li><code>{'{{name}}'}</code> - Nome do destinatário</li>
        <li><code>{'{{trackingCode}}'}</code> - Código de rastreamento da denúncia</li>
        <li><code>{'{{submissionDate}}'}</code> - Data de submissão</li>
        <li><code>{'{{newStatus}}'}</code> - Novo status da denúncia</li>
        <li><code>{'{{comments}}'}</code> - Comentários adicionais</li>
        <li><code>{'{{loginUrl}}'}</code> - URL de login</li>
      </ul>
    </div>
  );
};

export default TemplatePlaceholderHelp;
