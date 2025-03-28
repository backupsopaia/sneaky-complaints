
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Import our new components
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabNavigation from '@/components/admin/AdminTabNavigation';
import CompaniesTabContent from '@/components/admin/CompaniesTabContent';
import ReportsTabContent from '@/components/admin/ReportsTabContent';
import SettingsTabContent from '@/components/admin/SettingsTabContent';
import NewCompanyDialog from '@/components/admin/NewCompanyDialog';

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="container mx-auto py-6 px-4">
        <AdminHeader user={user} />

        <Tabs defaultValue="companies" className="space-y-6">
          <AdminTabNavigation activeTab="companies" />

          <TabsContent value="companies">
            <CompaniesTabContent
              companies={companies}
              handleToggleCompanyStatus={handleToggleCompanyStatus}
              openNewCompanyDialog={() => setShowNewCompanyDialog(true)}
            />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTabContent companies={companies} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTabContent user={user} />
          </TabsContent>
        </Tabs>

        <NewCompanyDialog
          open={showNewCompanyDialog}
          onOpenChange={setShowNewCompanyDialog}
          newCompany={newCompany}
          setNewCompany={setNewCompany}
          handleCreateCompany={handleCreateCompany}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
