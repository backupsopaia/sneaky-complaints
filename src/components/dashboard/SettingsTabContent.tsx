
import React, { useState } from 'react';
import { Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useAuth } from '@/context/auth/useAuth';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const SettingsTabContent = () => {
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
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
            <CardDescription>Configure os dados da sua empresa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Empresa
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={user?.companyName}
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email de Contacto
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={user?.email}
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logótipo
                </label>
                <div className="mt-1 flex items-center">
                  <div className="h-12 w-12 rounded border border-gray-300 bg-gray-100 flex items-center justify-center text-gray-400">
                    <Shield size={24} />
                  </div>
                  <Button className="ml-4" variant="outline" size="sm">
                    Alterar
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plano Atual
                </label>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {user?.plan === 'free' ? 'Gratuito' : user?.plan === 'pro' ? 'Profissional' : 'Empresarial'}
                  </span>
                  {user?.plan === 'free' && (
                    <Button className="ml-4" size="sm">
                      Fazer Upgrade
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Configurações de Email</CardTitle>
                <CardDescription>Configure o servidor de email para enviar notificações</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" onClick={handleTestEmailConfig}>
              Testar Configuração
            </Button>
            <Button onClick={handleSaveEmailConfig}>
              Guardar Configurações
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Configurações do Canal de Denúncias</CardTitle>
            <CardDescription>Personalize o seu canal de denúncias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL do Canal
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
                    value={`denuncieaqui.com/c/${user?.companyName?.toLowerCase().replace(/\s+/g, '-')}`}
                    readOnly
                  />
                  <Button className="rounded-l-none" variant="outline">
                    Copiar
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título do Canal
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Canal de Denúncias da Empresa XYZ"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem de Boas-vindas
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Mensagem que aparecerá para denunciantes"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categorias de Denúncias
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Assédio Moral
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Assédio Sexual
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Corrupção
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Fraude
                  </span>
                  <Button variant="outline" size="sm" className="h-5">
                    + Adicionar
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <Button>Guardar Alterações</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SettingsTabContent;
