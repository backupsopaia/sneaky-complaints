import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth';
import { useToast } from "@/hooks/use-toast";
import {
  Building,
  Plus,
  Settings,
  Users,
  FileText,
  Shield,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const AdminDashboard = () => {
  const { user, isAuthenticated, isLoading, isSuperAdmin, getCompanies, createCompany, activateCompany, deactivateCompany } = useAuth();
  const { toast } = useToast();
  const [companies, setCompanies] = useState<any[]>([]);
  const [showNewCompanyDialog, setShowNewCompanyDialog] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    domain: '',
    plan: 'free',
    settings: {
      reportCategories: ['Assédio', 'Fraude', 'Corrupção'],
      dataRetentionPeriod: 365,
      requiresAnonymity: true
    }
  });

  useEffect(() => {
    if (isAuthenticated && isSuperAdmin) {
      loadCompanies();
    }
  }, [isAuthenticated, isSuperAdmin]);

  const loadCompanies = async () => {
    try {
      const companiesList = await getCompanies();
      setCompanies(companiesList);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar empresas",
        description: "Não foi possível carregar a lista de empresas.",
      });
    }
  };

  const handleCreateCompany = async () => {
    try {
      await createCompany({
        name: newCompany.name,
        domain: newCompany.domain,
        active: true,
        plan: newCompany.plan as 'free' | 'pro' | 'enterprise',
        settings: {
          ...newCompany.settings,
          reportCategories: ['Assédio', 'Fraude', 'Corrupção']
        }
      });
      
      setShowNewCompanyDialog(false);
      toast({
        title: "Empresa criada",
        description: `A empresa ${newCompany.name} foi criada com sucesso.`,
      });
      
      setNewCompany({
        name: '',
        domain: '',
        plan: 'free',
        settings: {
          reportCategories: ['Assédio', 'Fraude', 'Corrupção'],
          dataRetentionPeriod: 365,
          requiresAnonymity: true
        }
      });
      
      loadCompanies();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao criar empresa",
        description: "Não foi possível criar a empresa. Tente novamente.",
      });
    }
  };

  const handleToggleCompanyStatus = async (id: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await deactivateCompany(id);
        toast({
          title: "Empresa desativada",
          description: "A empresa foi desativada com sucesso.",
        });
      } else {
        await activateCompany(id);
        toast({
          title: "Empresa ativada",
          description: "A empresa foi ativada com sucesso.",
        });
      }
      loadCompanies();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao alterar status",
        description: "Não foi possível alterar o status da empresa.",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  if (!isAuthenticated || !isSuperAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Administração Central</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Logado como: <span className="font-medium">{user?.email}</span>
              </span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                Super Admin
              </Badge>
            </div>
          </div>
          <p className="text-gray-500 mt-2">
            Gerencie todas as empresas e configurações da plataforma.
          </p>
        </header>

        <Tabs defaultValue="companies">
          <TabsList className="mb-6 grid grid-cols-3 max-w-md">
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Empresas
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Relatórios
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="companies">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Empresas Cadastradas</h2>
              <Button 
                onClick={() => setShowNewCompanyDialog(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Nova Empresa
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <Card key={company.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{company.name}</span>
                      <Badge 
                        variant={company.active ? "default" : "destructive"}
                        className="ml-2"
                      >
                        {company.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Plano: {company.plan === 'free' ? 'Gratuito' : company.plan === 'pro' ? 'Profissional' : 'Empresarial'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Domínio:</span>
                        <span className="text-sm font-medium">
                          {company.domain ? `${company.domain}.denuncieaqui.com` : 'Não definido'}
                        </span>
                      </div>
                      
                      {company.customDomain && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Domínio personalizado:</span>
                          <span className="text-sm font-medium">{company.customDomain}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Criado em:</span>
                        <span className="text-sm font-medium">
                          {new Date(company.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Categorias:</span>
                        <span className="text-sm font-medium">
                          {company.settings.reportCategories.length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={company.active} 
                        onCheckedChange={() => handleToggleCompanyStatus(company.id, company.active)}
                      />
                      <span className="text-sm">
                        {company.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios e Estatísticas</CardTitle>
                <CardDescription>
                  Visualize dados consolidados de todas as empresas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total de Empresas</p>
                      <p className="text-2xl font-bold">{companies.length}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Empresas Ativas</p>
                      <p className="text-2xl font-bold">{companies.filter(c => c.active).length}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                    <div className="p-2 bg-red-100 rounded-full">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Empresas Inativas</p>
                      <p className="text-2xl font-bold">{companies.filter(c => !c.active).length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Distribuição por Plano</h3>
                  <div className="h-64 bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-center items-center h-full">
                      <p className="text-gray-500">Gráficos e estatísticas serão exibidos aqui</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Plataforma</CardTitle>
                <CardDescription>
                  Gerencie as configurações globais da plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Configurações Gerais</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="platformName">Nome da Plataforma</Label>
                          <Input 
                            id="platformName" 
                            value="Denuncie Aqui" 
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="supportEmail">Email de Suporte</Label>
                          <Input 
                            id="supportEmail" 
                            value="suporte@denuncieaqui.com" 
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Administradores da Plataforma</h3>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-sm font-medium">Usuários com acesso de administrador</p>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <span>{user?.email}</span>
                          </div>
                          <Badge>Super Admin</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Configurações de Compliance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>LGPD/GDPR Compliance</Label>
                          <p className="text-sm text-gray-500">
                            Ative para garantir conformidade com leis de proteção de dados
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Logs de Atividade</Label>
                          <p className="text-sm text-gray-500">
                            Registra todas as ações de administradores
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Backups Automáticos</Label>
                          <p className="text-sm text-gray-500">
                            Realiza backups diários da plataforma
                          </p>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Salvar Configurações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showNewCompanyDialog} onOpenChange={setShowNewCompanyDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Empresa</DialogTitle>
              <DialogDescription>
                Cadastre uma nova empresa na plataforma.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input 
                  id="companyName" 
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                  placeholder="Ex: Empresa XYZ"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyDomain">Subdomínio</Label>
                <div className="flex items-center">
                  <Input 
                    id="companyDomain" 
                    value={newCompany.domain}
                    onChange={(e) => setNewCompany({...newCompany, domain: e.target.value})}
                    placeholder="Ex: minhaempresa"
                    className="rounded-r-none"
                  />
                  <div className="bg-gray-100 border border-l-0 border-input px-3 py-2 text-sm text-gray-500 rounded-r-md">
                    .denuncieaqui.com
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyPlan">Plano</Label>
                <Select 
                  value={newCompany.plan} 
                  onValueChange={(value) => setNewCompany({...newCompany, plan: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Gratuito</SelectItem>
                    <SelectItem value="pro">Profissional</SelectItem>
                    <SelectItem value="enterprise">Empresarial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Configurações de Privacidade</Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="requireAnonymity"
                    checked={newCompany.settings.requiresAnonymity}
                    onCheckedChange={(checked) => 
                      setNewCompany({
                        ...newCompany, 
                        settings: {...newCompany.settings, requiresAnonymity: checked}
                      })
                    }
                  />
                  <Label htmlFor="requireAnonymity">Permitir denúncias anônimas</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="retentionPeriod">Período de Retenção de Dados (dias)</Label>
                <Input 
                  id="retentionPeriod" 
                  type="number"
                  value={newCompany.settings.dataRetentionPeriod}
                  onChange={(e) => setNewCompany({
                    ...newCompany, 
                    settings: {
                      ...newCompany.settings, 
                      dataRetentionPeriod: parseInt(e.target.value) || 365
                    }
                  })}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewCompanyDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateCompany}>Criar Empresa</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
