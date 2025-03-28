
import React from 'react';
import { Shield, BarChart3, FileText, Settings, LogOut } from "lucide-react";
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
    <div className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">DenuncieAqui</span>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">Empresa</p>
        <p className="text-sm font-medium truncate">{user?.companyName}</p>
      </div>
      
      <nav className="px-2 py-4">
        <ul className="space-y-1">
          <li>
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 text-sm ${
                activeTab === 'overview' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 size={18} />
              <span>Visão Geral</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('reports')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 text-sm ${
                activeTab === 'reports' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText size={18} />
              <span>Denúncias</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 text-sm ${
                activeTab === 'settings' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings size={18} />
              <span>Configurações</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sair</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
