
import React from 'react';
import { Bell, User, Shield } from "lucide-react";
import { useAuth } from '@/context/auth/useAuth';

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardHeader = ({ activeTab, setActiveTab }: DashboardHeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="md:hidden flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">DenuncieAqui</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700">
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
