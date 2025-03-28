
import React from 'react';
import { Shield, FileText, User, Star, Upload, Cog, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/auth/useAuth';

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const DashboardSidebar = ({ activeTab, setActiveTab, handleLogout }: DashboardSidebarProps) => {
  const { user } = useAuth();

  return (
    <div className="w-[134px] bg-[#003b87] dark:bg-card text-white flex flex-col">
      <div className="p-4 flex justify-center">
        <div className="h-12 w-12 bg-white dark:bg-primary/10 rounded-full flex items-center justify-center">
          <User size={24} className="text-[#003b87] dark:text-primary" />
        </div>
      </div>
      
      <nav className="flex-1 py-6">
        <ul className="space-y-4">
          <li className="px-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex flex-col items-center gap-1 py-3 px-2 rounded-md transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-white/10 dark:bg-white/5' 
                  : 'hover:bg-white/5'
              }`}
            >
              <User size={20} />
              <span className="text-xs mt-1">Minha</span>
            </button>
          </li>
          
          <li className="px-2">
            <button 
              onClick={() => setActiveTab('reports')}
              className={`w-full flex flex-col items-center gap-1 py-3 px-2 rounded-md transition-colors ${
                activeTab === 'reports' 
                  ? 'bg-white/10 dark:bg-white/5' 
                  : 'hover:bg-white/5'
              }`}
            >
              <FileText size={20} />
              <span className="text-xs mt-1">Arquivos</span>
            </button>
          </li>
          
          <li className="px-2">
            <button 
              onClick={() => {}}
              className="w-full flex flex-col items-center gap-1 py-3 px-2 rounded-md transition-colors hover:bg-white/5"
            >
              <Star size={20} />
              <span className="text-xs mt-1">Favoritos</span>
            </button>
          </li>
          
          <li className="px-2">
            <button 
              onClick={() => {}}
              className="w-full flex flex-col items-center gap-1 py-3 px-2 rounded-md transition-colors hover:bg-white/5"
            >
              <Upload size={20} />
              <span className="text-xs mt-1">Carregar</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="mt-auto p-4">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex flex-col items-center gap-1 py-3 px-2 rounded-md transition-colors ${
            activeTab === 'settings' 
              ? 'bg-white/10 dark:bg-white/5' 
              : 'hover:bg-white/5'
          }`}
        >
          <Cog size={20} />
          <span className="text-xs mt-1">Configura</span>
        </button>
        
        <button 
          onClick={handleLogout}
          className="w-full flex flex-col items-center gap-1 py-3 px-2 rounded-md transition-colors hover:bg-white/5 mt-4"
        >
          <LogOut size={20} />
          <span className="text-xs mt-1">Sair</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
