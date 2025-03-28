
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import CompanyInfoSettings from './settings/CompanyInfoSettings';
import EmailConfigSettings from './settings/EmailConfigSettings';
import WhistleblowerChannelSettings from './settings/WhistleblowerChannelSettings';

const SettingsTabContent = () => {
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
            <CompanyInfoSettings />
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
            <EmailConfigSettings />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Configurações do Canal de Denúncias</CardTitle>
            <CardDescription>Personalize o seu canal de denúncias</CardDescription>
          </CardHeader>
          <CardContent>
            <WhistleblowerChannelSettings />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SettingsTabContent;
