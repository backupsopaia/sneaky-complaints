
import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface TemplatePlaceholder {
  name: string;
  description: string;
}

interface TemplatePlaceholderHelpProps {
  placeholders?: TemplatePlaceholder[];
}

const defaultPlaceholders: TemplatePlaceholder[] = [
  { name: 'name', description: 'Nome do destinatário' },
  { name: 'trackingCode', description: 'Código de rastreamento da denúncia' },
  { name: 'submissionDate', description: 'Data de submissão' },
  { name: 'newStatus', description: 'Novo status da denúncia' },
  { name: 'comments', description: 'Comentários adicionais' },
  { name: 'loginUrl', description: 'URL de login' },
];

const TemplatePlaceholderHelp: React.FC<TemplatePlaceholderHelpProps> = ({ 
  placeholders = defaultPlaceholders 
}) => {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-md p-4 mt-4">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
        <div>
          <h4 className="text-sm font-medium mb-2">Variáveis disponíveis para uso no template:</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Insira estas variáveis no seu template e elas serão substituídas pelos valores reais quando o email for enviado.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {placeholders.map((placeholder) => (
              <div key={placeholder.name} className="flex items-center gap-2 text-sm">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">{'{{' + placeholder.name + '}}'}</code>
                <span className="text-muted-foreground text-xs">{placeholder.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePlaceholderHelp;
