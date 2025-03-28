
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
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
  XCircle,
  Calendar,
  TrendingUp,
  PieChart,
  Bell
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
import ThemeToggle from '@/components/ThemeToggle';

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 mb-4"></div>
          <div className="h-2 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isSuperAdmin) {
    return <Navigate to="/login" replace />;
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="container mx-auto py-6 px-4">
        <header className="mb-8 bg-white dark:bg-card rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Administração Central</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Gerencie empresas e configurações da plataforma
                </p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
              </div>
              
              <ThemeToggle />
              
              <div className="hidden md:flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Logado como</span>
                  <span className="text-sm font-medium">{user?.email}</span>
                </div>
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Super Admin
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <Tabs defaultValue="companies" className="space-y-6">
          <div className="bg-white dark:bg-card rounded-lg shadow-sm p-2 mb-6 border border-gray-100 dark:border-gray-700">
            <TabsList className="grid grid-cols-3 w-full md:w-auto md:inline-flex gap-1">
              <TabsTrigger value="companies" className="flex items-center gap-2 py-2.5">
                <Building className="h-4 w-4" />
                <span>Empresas</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2 py-2.5">
                <FileText className="h-4 w-4" />
                <span>Relatórios</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 py-2.5">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="companies">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-6"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Empresas Cadastradas</h2>
                  <p className="text-gray-500 dark:text-gray-400">Gerencie todas as empresas da plataforma</p>
                </div>
                <Button 
                  onClick={() => setShowNewCompanyDialog(true)}
                  className="flex items-center gap-2 corporate-gradient text-white hover-lift"
                >
                  <Plus className="h-4 w-4" />
                  Nova Empresa
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="corporate-card h-full flex flex-col">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${company.active ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                              <Building className={`h-5 w-5 ${company.active ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{company.name}</CardTitle>
                              <CardDescription>
                                {company.plan === 'free' ? 'Plano Gratuito' : 
                                 company.plan === 'pro' ? 'Plano Profissional' : 'Plano Empresarial'}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge 
                            variant={company.active ? "default" : "destructive"}
                            className={`ml-2 ${company.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                          >
                            {company.active ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Domínio:</span>
                            <span className="text-sm font-medium">
                              {company.domain ? `${company.domain}.denuncieaqui.com` : 'Não definido'}
                            </span>
                          </div>
                          
                          {company.customDomain && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Domínio personalizado:</span>
                              <span className="text-sm font-medium">{company.customDomain}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Criado em:</span>
                            <span className="text-sm font-medium">
                              {new Date(company.createdAt).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Categorias:</span>
                            <div className="flex gap-1">
                              {company.settings.reportCategories.slice(0, 2).map((category: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-xs">{category}</Badge>
                              ))}
                              {company.settings.reportCategories.length > 2 && (
                                <Badge variant="outline" className="text-xs">+{company.settings.reportCategories.length - 2}</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                        <Button variant="outline" size="sm" className="hover-lift">
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="reports">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="corporate-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Relatórios e Estatísticas</CardTitle>
                      <CardDescription>
                        Visualize dados consolidados de todas as empresas
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="stat-card"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total de Empresas</p>
                          <p className="text-2xl font-bold">{companies.length}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="stat-card"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Empresas Ativas</p>
                          <p className="text-2xl font-bold">{companies.filter(c => c.active).length}</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="stat-card"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                          <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Empresas Inativas</p>
                          <p className="text-2xl font-bold">{companies.filter(c => !c.active).length}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                        Distribuição por Plano
                      </h3>
                      <div className="h-64 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                        <div className="w-full max-w-md grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-40 relative overflow-hidden">
                              <div
                                className="bg-blue-500 h-full rounded-full"
                                style={{ height: `${(companies.filter(c => c.plan === 'free').length / companies.length) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-sm font-medium mt-2">Gratuito</p>
                            <p className="text-xs text-gray-500">{companies.filter(c => c.plan === 'free').length}</p>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-40 relative overflow-hidden">
                              <div
                                className="bg-purple-500 h-full rounded-full"
                                style={{ height: `${(companies.filter(c => c.plan === 'pro').length / companies.length) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-sm font-medium mt-2">Profissional</p>
                            <p className="text-xs text-gray-500">{companies.filter(c => c.plan === 'pro').length}</p>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-40 relative overflow-hidden">
                              <div
                                className="bg-orange-500 h-full rounded-full"
                                style={{ height: `${(companies.filter(c => c.plan === 'enterprise').length / companies.length) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-sm font-medium mt-2">Empresarial</p>
                            <p className="text-xs text-gray-500">{companies.filter(c => c.plan === 'enterprise').length}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-primary" />
                        Atividade Recente
                      </h3>
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                        <div className="space-y-4">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                                <Building className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">Nova empresa cadastrada</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Há {item} hora{item > 1 ? 's' : ''}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="settings">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card className="corporate-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Configurações da Plataforma</CardTitle>
                      <CardDescription>
                        Gerencie as configurações globais da plataforma
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <PieChart className="mr-2 h-5 w-5 text-primary" />
                        Configurações Gerais
                      </h3>
                      <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="platformName">Nome da Plataforma</Label>
                            <Input 
                              id="platformName" 
                              value="Denuncie Aqui" 
                              className="transition-all focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="supportEmail">Email de Suporte</Label>
                            <Input 
                              id="supportEmail" 
                              value="suporte@denuncieaqui.com" 
                              className="transition-all focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dateFormat">Formato de Data</Label>
                            <Select defaultValue="dmy">
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um formato" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="language">Idioma Padrão</Label>
                            <Select defaultValue="pt-br">
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um idioma" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Español</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <Shield className="mr-2 h-5 w-5 text-primary" />
                        Administradores da Plataforma
                      </h3>
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                          <p className="text-sm font-medium">Usuários com acesso de administrador</p>
                          <Button size="sm" variant="outline" className="hover-lift">
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span>{user?.email}</span>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Super Admin</Badge>
                          </div>
                          
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span>admin@example.com</span>
                            </div>
                            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Admin</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
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
                            <Label>Logs de Atividade</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Registra todas as ações de administradores
                            </p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Backups Automáticos</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Realiza backups diários da plataforma
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
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-100 dark:border-gray-700 pt-4">
                  <Button className="corporate-gradient text-white hover-lift">Salvar Configurações</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        <Dialog open={showNewCompanyDialog} onOpenChange={setShowNewCompanyDialog}>
          <DialogContent className="sm:max-w-md corporate-card border-0">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Nova Empresa
              </DialogTitle>
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
                  className="transition-all focus:ring-2 focus:ring-primary/20"
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
                    className="rounded-r-none transition-all focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="bg-gray-100 dark:bg-gray-800 border border-l-0 border-input px-3 py-2 text-sm text-gray-500 rounded-r-md">
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
                  className="transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewCompanyDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateCompany} className="corporate-gradient text-white hover-lift">
                Criar Empresa
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
