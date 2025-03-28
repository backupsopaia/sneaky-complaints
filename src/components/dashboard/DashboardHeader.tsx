
import React from 'react';
import { Bell, User, Search } from "lucide-react";
import { useAuth } from '@/context/auth/useAuth';
import { Input } from "@/components/ui/input";
import ThemeToggle from '@/components/ThemeToggle';

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardHeader = ({ activeTab, setActiveTab }: DashboardHeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-card border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center shadow-sm">
      <div className="relative flex-1 max-w-xl mx-auto md:mx-0">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <Input 
          type="search" 
          placeholder="Procurar" 
          className="pl-10 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full w-full"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <User size={16} />
          </div>
          <span className="text-sm font-medium hidden md:block">{user?.email}</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
