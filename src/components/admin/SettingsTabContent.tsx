
import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from '@/types/auth';

// Import the new component files
import GeneralSettings from './settings/GeneralSettings';
import EmailSettings from './settings/EmailSettings';
import AdminUsersSettings from './settings/AdminUsersSettings';
import ComplianceSettings from './settings/ComplianceSettings';

interface SettingsTabContentProps {
  user: User | null;
}

const SettingsTabContent = ({ user }: SettingsTabContentProps) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <Card className="corporate-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Configurações da Plataforma</CardTitle>
              <CardDescription>
                Gerencie as configurações globais da plataforma
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <GeneralSettings />
            <EmailSettings />
            <AdminUsersSettings user={user} />
            <ComplianceSettings />
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <Button className="corporate-gradient text-white hover-lift">
            Guardar Configurações
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SettingsTabContent;
