
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Bell, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ThemeToggle from '@/components/ThemeToggle';
import { User } from '@/types/auth';

interface AdminHeaderProps {
  user: User | null;
}

const AdminHeader = ({ user }: AdminHeaderProps) => {
  return (
    <header className="mb-8 bg-white dark:bg-card rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="p-3 bg-primary/10 rounded-lg">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Administração Central</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Gerencie empresas e configurações da plataforma
            </p>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>
          
          <ThemeToggle />
          
          <div className="hidden md:flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400">Logado como</span>
              <span className="text-sm font-medium">{user?.email}</span>
            </div>
            <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Super Admin
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
