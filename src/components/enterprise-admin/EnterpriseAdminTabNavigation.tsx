
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, FileText, Settings, Users } from "lucide-react";

interface EnterpriseAdminTabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const EnterpriseAdminTabNavigation = ({ activeTab, setActiveTab }: EnterpriseAdminTabNavigationProps) => {
  return (
    <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-8">
      <TabsTrigger 
        value="overview" 
        onClick={() => setActiveTab("overview")}
        className={activeTab === "overview" ? "data-[state=active]:bg-primary/20" : ""}
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        Visão Geral
      </TabsTrigger>
      <TabsTrigger 
        value="reports" 
        onClick={() => setActiveTab("reports")}
        className={activeTab === "reports" ? "data-[state=active]:bg-primary/20" : ""}
      >
        <FileText className="w-4 h-4 mr-2" />
        Denúncias
      </TabsTrigger>
      <TabsTrigger 
        value="team" 
        onClick={() => setActiveTab("team")}
        className={activeTab === "team" ? "data-[state=active]:bg-primary/20" : ""}
      >
        <Users className="w-4 h-4 mr-2" />
        Colaboradores
      </TabsTrigger>
      <TabsTrigger 
        value="settings" 
        onClick={() => setActiveTab("settings")}
        className={activeTab === "settings" ? "data-[state=active]:bg-primary/20" : ""}
      >
        <Settings className="w-4 h-4 mr-2" />
        Configurações
      </TabsTrigger>
    </TabsList>
  );
};

export default EnterpriseAdminTabNavigation;
