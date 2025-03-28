
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/auth/useAuth';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardMobileTabs from '@/components/dashboard/DashboardMobileTabs';
import OverviewTabContent from '@/components/dashboard/OverviewTabContent';
import ReportsTabContent from '@/components/dashboard/ReportsTabContent';
import SettingsTabContent from '@/components/dashboard/SettingsTabContent';

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

  const handleCreateReport = () => {
    navigate('/report');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <DashboardSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <DashboardMobileTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <TabsContent value="overview">
              <OverviewTabContent handleCreateReport={handleCreateReport} />
            </TabsContent>
            
            <TabsContent value="reports">
              <ReportsTabContent handleCreateReport={handleCreateReport} />
            </TabsContent>
            
            <TabsContent value="settings">
              <SettingsTabContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
