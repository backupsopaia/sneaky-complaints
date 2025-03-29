import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface AdminTabNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  tabs: TabItem[];
}

const AdminTabNavigation: React.FC<AdminTabNavigationProps> = ({
  activeTab,
  onTabChange,
  tabs
}) => {
  return (
    <TabsList className="grid grid-cols-7 h-auto p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="flex items-center gap-2 py-2"
            onClick={() => onTabChange(tab.id)}
          >
            <Icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
};

export default AdminTabNavigation;
