
import React from 'react';
import { Mail } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const EmailSettings = () => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Mail className="mr-2 h-5 w-5 text-primary" />
        Configurações de Email
      </h3>
      <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="smtpServer">Servidor SMTP</Label>
            <Input 
              id="smtpServer" 
              placeholder="smtp.exemplo.com" 
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPort">Porta SMTP</Label>
            <Input 
              id="smtpPort" 
              placeholder="587" 
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpUsername">Nome de Utilizador SMTP</Label>
            <Input 
              id="smtpUsername" 
              placeholder="email@exemplo.com" 
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPassword">Palavra-passe SMTP</Label>
            <Input 
              id="smtpPassword" 
              type="password" 
              placeholder="••••••••" 
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senderEmail">Email do Remetente</Label>
            <Input 
              id="senderEmail" 
              placeholder="noreply@denuncieaqui.com" 
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senderName">Nome do Remetente</Label>
            <Input 
              id="senderName" 
              placeholder="Denuncie Aqui" 
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <div className="space-y-0.5">
            <Label>Encriptação SSL/TLS</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ativar encriptação segura para emails
            </p>
          </div>
          <Switch checked={true} />
        </div>
        
        <div className="pt-4">
          <Button variant="outline" size="sm" className="mr-2">
            Testar Configuração
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;
