
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth';
import { useToast } from "@/hooks/use-toast";
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabNavigation from '@/components/admin/AdminTabNavigation';
import ContentEditor from '@/components/admin/content/ContentEditor';
import NavigationEditor from '@/components/admin/content/NavigationEditor';
import FooterEditor from '@/components/admin/content/FooterEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContentManagement = () => {
  const { user, isAuthenticated, isLoading, isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("homepage");

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

        <Tabs defaultValue="homepage" value={activeSection} onValueChange={setActiveSection} className="space-y-6">
          <AdminTabNavigation activeTab="content" />
          
          <div className="flex justify-center mb-4">
            <TabsList>
              <TabsTrigger value="homepage">Página Inicial</TabsTrigger>
              <TabsTrigger value="login">Página de Login</TabsTrigger>
              <TabsTrigger value="dashboard">Painel de Controlo</TabsTrigger>
              <TabsTrigger value="navigation">Navegação</TabsTrigger>
              <TabsTrigger value="footer">Rodapé</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="homepage">
            <ContentEditor section="homepage" />
          </TabsContent>

          <TabsContent value="login">
            <ContentEditor section="login" />
          </TabsContent>

          <TabsContent value="dashboard">
            <ContentEditor section="dashboard" />
          </TabsContent>

          <TabsContent value="navigation">
            <NavigationEditor />
          </TabsContent>

          <TabsContent value="footer">
            <FooterEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentManagement;
