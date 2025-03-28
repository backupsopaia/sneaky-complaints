
import React from 'react';
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from '@/context/auth/useAuth';

const SettingsTabContent = () => {
  const { user } = useAuth();

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
                  Email de Contato
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
                  Logotipo
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
            <CardTitle>Configurações do Canal de Denúncias</CardTitle>
            <CardDescription>Personalize seu canal de denúncias</CardDescription>
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
                <Button>Salvar Alterações</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SettingsTabContent;
