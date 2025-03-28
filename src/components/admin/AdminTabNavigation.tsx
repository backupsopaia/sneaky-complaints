
import React from 'react';
import { Building, FileText, Settings } from 'lucide-react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminTabNavigationProps {
  activeTab: string;
}

const AdminTabNavigation = ({ activeTab }: AdminTabNavigationProps) => {
  return (
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
  );
};

export default AdminTabNavigation;
