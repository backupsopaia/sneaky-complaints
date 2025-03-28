
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth/useAuth';
import { useToast } from "@/hooks/use-toast";
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabNavigation from '@/components/admin/AdminTabNavigation';
import ContentEditor from '@/components/admin/content/ContentEditor';
import { Tabs, TabsContent } from "@/components/ui/tabs";

const ContentManagement = () => {
  const { user, isAuthenticated, isLoading, isSuperAdmin } = useAuth();
  const { toast } = useToast();

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

        <Tabs defaultValue="homepage" className="space-y-6">
          <AdminTabNavigation activeTab="content" />

          <TabsContent value="homepage">
            <ContentEditor section="homepage" />
          </TabsContent>

          <TabsContent value="login">
            <ContentEditor section="login" />
          </TabsContent>

          <TabsContent value="dashboard">
            <ContentEditor section="dashboard" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentManagement;
