import React, { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Import our new components
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabNavigation from '@/components/admin/AdminTabNavigation';
import CompaniesTabContent from '@/components/admin/CompaniesTabContent';
import ReportsTabContent from '@/components/admin/ReportsTabContent';
import SettingsTabContent from '@/components/admin/SettingsTabContent';
import PerformanceEvaluationContent from '@/components/admin/PerformanceEvaluationContent';
import ContentEditor from '@/components/admin/ContentEditor';
import NewCompanyDialog from '@/components/admin/NewCompanyDialog';
import BrandingSettings from '@/components/admin/BrandingSettings';
import UserManagement from '@/components/admin/UserManagement';
import NotificationSettings from '@/components/admin/NotificationSettings';
import { LayoutDashboard, FileText, Palette, Users, TrendingUp, Bell, Settings } from 'lucide-react';
import PerformanceDashboard from '@/components/admin/PerformanceDashboard';
import { CompanyDatabases } from '@/components/admin/CompanyDatabases';
import { Company } from '@/types/auth';
import { authService } from '@/services/authService';

interface Company {
  name: string;
  domain: string;
  plan: string;
  settings: {
    reportCategories: string[];
    dataRetentionPeriod: number;
    requiresAnonymity: boolean;
  };
}

const AdminDashboard = () => {
  const { user, isAuthenticated, isLoading, isSuperAdmin, getCompanies, createCompany, activateCompany, deactivateCompany } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'dashboard');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showNewCompanyDialog, setShowNewCompanyDialog] = useState(false);
  const [newCompany, setNewCompany] = useState<Company>({
    name: '',
    domain: '',
    plan: 'free',
    settings: {
      reportCategories: ['Assédio', 'Fraude', 'Corrupção'],
      dataRetentionPeriod: 365,
      requiresAnonymity: true
    }
  });
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'content', label: 'Conteúdo', icon: FileText },
    { id: 'branding', label: 'Marca', icon: Palette },
    { id: 'users', label: 'Utilizadores', icon: Users },
    { id: 'performance', label: 'Desempenho', icon: TrendingUp },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'databases', label: 'Bancos de Dados', icon: LayoutDashboard },
    { id: 'companies', label: 'Empresas', icon: LayoutDashboard }
  ];

  useEffect(() => {
    if (tabParam && ['dashboard', 'content', 'branding', 'users', 'performance', 'notifications', 'settings', 'databases', 'companies'].includes(tabParam)) {
      setActiveTab(tabParam);
    } else {
      setActiveTab('dashboard');
    }
  }, [tabParam]);

  useEffect(() => {
    if (isAuthenticated && isSuperAdmin) {
      loadCompanies();
    }
  }, [isAuthenticated, isSuperAdmin]);

  const loadCompanies = async () => {
    try {
      const data = await authService.getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar a lista de empresas',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCompany = async (data: any) => {
    try {
      await createCompany(data);
      toast({
        title: "Sucesso",
        description: "Empresa criada com sucesso.",
      });
      loadCompanies();
      setShowNewCompanyDialog(false);
    } catch (error) {
      console.error('Error creating company:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a empresa.",
        variant: "destructive",
      });
    }
  };

  const handleActivateCompany = async (companyId: string) => {
    try {
      await activateCompany(companyId);
      toast({
        title: "Sucesso",
        description: "Empresa ativada com sucesso.",
      });
      loadCompanies();
    } catch (error) {
      console.error('Error activating company:', error);
      toast({
        title: "Erro",
        description: "Não foi possível ativar a empresa.",
        variant: "destructive",
      });
    }
  };

  const handleDeactivateCompany = async (companyId: string) => {
    try {
      await deactivateCompany(companyId);
      toast({
        title: "Sucesso",
        description: "Empresa desativada com sucesso.",
      });
      loadCompanies();
    } catch (error) {
      console.error('Error deactivating company:', error);
      toast({
        title: "Erro",
        description: "Não foi possível desativar a empresa.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated || !isSuperAdmin) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <AdminHeader user={user} />

      <div className="bg-white dark:bg-card rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <AdminTabNavigation activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

          <div className="mt-6">
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{companies.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Empresas Ativas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{companies.filter(c => c.isActive).length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Denúncias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                  </CardContent>
                </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <ContentEditor />
          </TabsContent>

            <TabsContent value="branding">
              <BrandingSettings />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="performance">
              <PerformanceDashboard />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationSettings />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTabContent user={user} />
          </TabsContent>

            <TabsContent value="databases">
              <CompanyDatabases companies={companies} />
            </TabsContent>

            <TabsContent value="companies">
              <Card>
                <CardHeader>
                  <CardTitle>Empresas Cadastradas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {companies.map(company => (
                      <Card key={company.id}>
                        <CardHeader>
                          <CardTitle>{company.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-500">{company.email}</p>
                          <p className="text-sm text-gray-500">
                            ID: {company.id}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

        <NewCompanyDialog
          open={showNewCompanyDialog}
          onOpenChange={setShowNewCompanyDialog}
        handleCreateCompany={handleCreateCompany}
          newCompany={newCompany}
          setNewCompany={setNewCompany}
        />
    </div>
  );
};

export default AdminDashboard;
