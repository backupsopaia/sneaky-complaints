
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ComplianceSettings = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <AlertCircle className="mr-2 h-5 w-5 text-primary" />
        Configurações de Compliance
      </h3>
      <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>LGPD/GDPR Compliance</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ative para garantir conformidade com leis de proteção de dados
            </p>
          </div>
          <Switch checked={true} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Registos de Atividade</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Regista todas as ações de administradores
            </p>
          </div>
          <Switch checked={true} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Cópias de Segurança Automáticas</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Realiza cópias de segurança diárias da plataforma
            </p>
          </div>
          <Switch checked={true} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Autenticação em Dois Fatores</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Exige 2FA para todos os administradores
            </p>
          </div>
          <Switch checked={false} />
        </div>
      </div>
    </div>
  );
};

export default ComplianceSettings;
