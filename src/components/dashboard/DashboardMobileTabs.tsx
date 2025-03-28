
import React from 'react';
import {
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { BarChart3, FileText, Settings } from 'lucide-react';

interface DashboardMobileTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const DashboardMobileTabs = ({ activeTab, onTabChange }: DashboardMobileTabsProps) => {
  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'reports', label: 'Denúncias', icon: FileText },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];
  
  return (
    <TabsList className="md:hidden mb-4 p-1 bg-muted/80 backdrop-blur-sm rounded-full">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        
        return (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <Icon size={18} />
              <span>{tab.label}</span>
            </div>
            
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-background rounded-full -z-10"
                layoutId="activeTab"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
};

export default DashboardMobileTabs;
