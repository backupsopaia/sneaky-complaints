
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';
import { Shield, LogOut, Settings, BarChart3, Users, FileText, Bell, MessageSquare, User } from "lucide-react";

const mockReports = [
  {
    id: '1',
    date: '2023-05-15',
    category: 'Assédio Moral',
    status: 'Em Análise',
    anonymous: true
  },
  {
    id: '2',
    date: '2023-05-10',
    category: 'Fraude',
    status: 'Investigação',
    anonymous: false
  },
  {
    id: '3',
    date: '2023-05-02',
    category: 'Conflito de Interesses',
    status: 'Concluído',
    anonymous: true
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logout bem-sucedido",
      description: "Você saiu da sua conta.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">DenuncieAqui</span>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">Empresa</p>
          <p className="text-sm font-medium truncate">{user.companyName}</p>
        </div>
        
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 text-sm ${
                  activeTab === 'overview' 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BarChart3 size={18} />
                <span>Visão Geral</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('reports')}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 text-sm ${
                  activeTab === 'reports' 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText size={18} />
                <span>Denúncias</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 text-sm ${
                  activeTab === 'settings' 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings size={18} />
                <span>Configurações</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sair</span>
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="md:hidden flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">DenuncieAqui</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <User size={16} />
              </div>
              <span className="text-sm font-medium hidden md:block">{user.email}</span>
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="md:hidden mb-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="reports">Denúncias</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <h1 className="text-2xl font-bold mb-6">Visão Geral</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total de Denúncias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3</div>
                    <p className="text-xs text-gray-500 mt-1">+2 novas este mês</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Em Análise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1</div>
                    <p className="text-xs text-gray-500 mt-1">Tempo médio: 5 dias</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Resolvidas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1</div>
                    <p className="text-xs text-gray-500 mt-1">33% do total</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Últimas Denúncias</CardTitle>
                    <CardDescription>Acompanhe as denúncias mais recentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockReports.map(report => (
                        <div key={report.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <div className="font-medium flex items-center gap-2">
                              #{report.id} 
                              {report.anonymous && (
                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                  Anônimo
                                </span>
                              )}
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              report.status === 'Em Análise' 
                                ? 'bg-yellow-100 text-yellow-800'
                                : report.status === 'Investigação'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {report.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.category} • {report.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Configuração do Canal</CardTitle>
                    <CardDescription>Ajuste seu canal de denúncias</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Link Personalizado</p>
                          <p className="text-sm text-gray-500">denuncieaqui.com/c/{user.companyName?.toLowerCase().replace(/\s+/g, '-')}</p>
                        </div>
                        <Button variant="outline" size="sm">Copiar</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Logotipo da Empresa</p>
                          <p className="text-sm text-gray-500">Personalizar aparência</p>
                        </div>
                        <Button variant="outline" size="sm">Editar</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Categorias de Denúncias</p>
                          <p className="text-sm text-gray-500">Definir categorias para classificação</p>
                        </div>
                        <Button variant="outline" size="sm">Configurar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <h1 className="text-2xl font-bold mb-6">Denúncias</h1>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Todas as Denúncias</CardTitle>
                      <CardDescription>Gerencie e acompanhe as denúncias recebidas</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">Exportar</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Protocolo
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Categoria
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockReports.map((report) => (
                          <tr key={report.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{report.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                report.status === 'Em Análise' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : report.status === 'Investigação'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {report.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {report.anonymous ? 'Anônimo' : 'Identificado'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Button variant="ghost" size="sm">
                                <MessageSquare size={16} className="mr-1" />
                                <span>Responder</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
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
                          value={user.companyName}
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
                          value={user.email}
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
                            {user.plan === 'free' ? 'Gratuito' : user.plan === 'pro' ? 'Profissional' : 'Empresarial'}
                          </span>
                          {user.plan === 'free' && (
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
                            value={`denuncieaqui.com/c/${user.companyName?.toLowerCase().replace(/\s+/g, '-')}`}
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
