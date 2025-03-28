
import React, { useState } from 'react';
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/auth/useAuth';

const EmailConfigSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [emailConfig, setEmailConfig] = useState({
    smtpServer: '',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    senderEmail: user?.email || '',
    senderName: user?.companyName || '',
    enableSSL: true
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setEmailConfig({
      ...emailConfig,
      [id]: type === 'checkbox' ? checked : value
    });
  };

  const handleTestEmailConfig = () => {
    // Esta função seria conectada a um serviço real para testar a configuração
    toast({
      title: "Email de teste enviado",
      description: "Verifique a sua caixa de entrada para confirmar a receção.",
    });
  };

  const handleSaveEmailConfig = () => {
    // Esta função seria conectada a um serviço real para salvar as configurações
    toast({
      title: "Configurações guardadas",
      description: "As configurações de email foram guardadas com sucesso.",
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtpServer">Servidor SMTP</Label>
            <Input 
              id="smtpServer" 
              value={emailConfig.smtpServer}
              onChange={handleEmailChange}
              placeholder="smtp.exemplo.com" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPort">Porta SMTP</Label>
            <Input 
              id="smtpPort" 
              value={emailConfig.smtpPort}
              onChange={handleEmailChange}
              placeholder="587" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpUsername">Nome de Utilizador SMTP</Label>
            <Input 
              id="smtpUsername" 
              value={emailConfig.smtpUsername}
              onChange={handleEmailChange}
              placeholder="email@exemplo.com" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPassword">Palavra-passe SMTP</Label>
            <Input 
              id="smtpPassword" 
              type="password" 
              value={emailConfig.smtpPassword}
              onChange={handleEmailChange}
              placeholder="••••••••" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senderEmail">Email do Remetente</Label>
            <Input 
              id="senderEmail" 
              value={emailConfig.senderEmail}
              onChange={handleEmailChange}
              placeholder="noreply@suaempresa.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senderName">Nome do Remetente</Label>
            <Input 
              id="senderName" 
              value={emailConfig.senderName}
              onChange={handleEmailChange}
              placeholder="Nome da Sua Empresa"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <div className="space-y-0.5">
            <Label htmlFor="enableSSL">Encriptação SSL/TLS</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ativar encriptação segura para emails
            </p>
          </div>
          <Switch 
            id="enableSSL" 
            checked={emailConfig.enableSSL}
            onCheckedChange={(checked) => setEmailConfig({...emailConfig, enableSSL: checked})}
          />
        </div>
      </div>
      <div className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={handleTestEmailConfig}>
          Testar Configuração
        </Button>
        <Button onClick={handleSaveEmailConfig}>
          Guardar Configurações
        </Button>
      </div>
    </>
  );
};

export default EmailConfigSettings;
