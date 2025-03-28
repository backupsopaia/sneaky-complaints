
import React from 'react';
import { Shield, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';
import { User } from '@/types/auth';

interface AdminUsersSettingsProps {
  user: User | null;
}

const AdminUsersSettings = ({ user }: AdminUsersSettingsProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Shield className="mr-2 h-5 w-5 text-primary" />
        Administradores da Plataforma
      </h3>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium">Utilizadores com acesso de administrador</p>
          <Button size="sm" variant="outline" className="hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span>{user?.email}</span>
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Super Admin
            </Badge>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span>admin@example.com</span>
            </div>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              Admin
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersSettings;
