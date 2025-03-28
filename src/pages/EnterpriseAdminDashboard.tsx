
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent } from "@/components/ui/tabs";

// Import components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EnterpriseAdminTabNavigation from '@/components/enterprise-admin/EnterpriseAdminTabNavigation';
import EnterpriseOverviewTab from '@/components/enterprise-admin/EnterpriseOverviewTab';

const EnterpriseAdminDashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      // In a real application, fetch reports from an API
      fetchReports();
    }
  }, [isAuthenticated]);

  const fetchReports = async () => {
    try {
      // This is mock data, in a real app you would fetch from API
      const mockReports = [
        { id: 1, title: 'Assédio no departamento de vendas', category: 'Assédio Moral', status: 'Novo', date: '2023-06-15', priority: 'Alta' },
        { id: 2, title: 'Suspeita de fraude em contratos', category: 'Fraude', status: 'Em Análise', date: '2023-06-10', priority: 'Alta' },
        { id: 3, title: 'Violação de política de segurança', category: 'Segurança', status: 'Resolvido', date: '2023-05-28', priority: 'Média' },
        { id: 4, title: 'Conflito de interesse com fornecedor', category: 'Conflito de Interesses', status: 'Em Análise', date: '2023-06-05', priority: 'Baixa' },
        { id: 5, title: 'Discriminação na contratação', category: 'Discriminação', status: 'Novo', date: '2023-06-12', priority: 'Média' },
        { id: 6, title: 'Desvio de recursos da empresa', category: 'Fraude', status: 'Em Análise', date: '2023-05-30', priority: 'Alta' },
        { id: 7, title: 'Vazamento de dados sensíveis', category: 'Segurança', status: 'Novo', date: '2023-06-14', priority: 'Alta' },
        { id: 8, title: 'Assédio sexual no escritório', category: 'Assédio Sexual', status: 'Novo', date: '2023-06-13', priority: 'Alta' },
      ];
      setReports(mockReports);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao carregar denúncias",
        description: "Não foi possível carregar a lista de denúncias.",
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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <div className="container mx-auto py-6 px-4">
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        <Tabs value={activeTab} className="space-y-6">
          <EnterpriseAdminTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <TabsContent value="overview">
            <EnterpriseOverviewTab reports={reports} />
          </TabsContent>

          {/* Additional tabs can be added here later */}
        </Tabs>
      </div>
    </div>
  );
};

export default EnterpriseAdminDashboard;
