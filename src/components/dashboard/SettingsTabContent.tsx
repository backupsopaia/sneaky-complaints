
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, FileText } from "lucide-react";
import CompanyInfoSettings from './settings/CompanyInfoSettings';
import EmailConfigSettings from './settings/EmailConfigSettings';
import WhistleblowerChannelSettings from './settings/WhistleblowerChannelSettings';
import EmailTemplatesSettings from './settings/EmailTemplatesSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsTabContent = () => {
  const [activeTab, setActiveTab] = React.useState('general');
  
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
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
              <CardTitle>Configurações do Canal de Denúncias</CardTitle>
              <CardDescription>Personalize o seu canal de denúncias</CardDescription>
            </CardHeader>
            <CardContent>
              <WhistleblowerChannelSettings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-6">
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
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle>Templates de Email</CardTitle>
                  <CardDescription>Personalize os modelos de email que serão enviados</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <EmailTemplatesSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SettingsTabContent;
