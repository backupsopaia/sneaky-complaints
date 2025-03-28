
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, PieChart, Shield, AlertCircle, Plus, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User } from '@/types/auth';

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
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <PieChart className="mr-2 h-5 w-5 text-primary" />
                Configurações Gerais
              </h3>
              <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platformName">Nome da Plataforma</Label>
                    <Input 
                      id="platformName" 
                      value="Denuncie Aqui" 
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Email de Suporte</Label>
                    <Input 
                      id="supportEmail" 
                      value="suporte@denuncieaqui.com" 
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Formato de Data</Label>
                    <Select defaultValue="dmy">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma Padrão</Label>
                    <Select defaultValue="pt-pt">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-pt">Português (Portugal)</SelectItem>
                        <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
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
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Super Admin</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>admin@example.com</span>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">Admin</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                Configurações de Compliance
              </h3>
              <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>LGPD/GDPR Compliance</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ative para garantir conformidade com leis de proteção de dados
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Logs de Atividade</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Regista todas as ações de administradores
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backups Automáticos</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Realiza backups diários da plataforma
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação em Dois Fatores</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Exige 2FA para todos os administradores
                    </p>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <Button className="corporate-gradient text-white hover-lift">Guardar Configurações</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SettingsTabContent;
