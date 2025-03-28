
import React from 'react';
import { PieChart } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GeneralSettings = () => {
  return (
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
  );
};

export default GeneralSettings;
