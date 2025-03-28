
import React from 'react';
import {
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface DashboardMobileTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const DashboardMobileTabs = ({ activeTab, onTabChange }: DashboardMobileTabsProps) => {
  return (
    <TabsList className="md:hidden mb-4">
      <TabsTrigger value="overview">Visão Geral</TabsTrigger>
      <TabsTrigger value="reports">Denúncias</TabsTrigger>
      <TabsTrigger value="settings">Configurações</TabsTrigger>
    </TabsList>
  );
};

export default DashboardMobileTabs;
