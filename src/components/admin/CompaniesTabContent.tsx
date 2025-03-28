
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Building, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface CompaniesTabContentProps {
  companies: any[];
  handleToggleCompanyStatus: (id: string, currentStatus: boolean) => Promise<void>;
  openNewCompanyDialog: () => void;
}

const CompaniesTabContent = ({ 
  companies, 
  handleToggleCompanyStatus, 
  openNewCompanyDialog 
}: CompaniesTabContentProps) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="mb-6"
    >
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Empresas Cadastradas</h2>
          <p className="text-gray-500 dark:text-gray-400">Gerencie todas as empresas da plataforma</p>
        </div>
        <Button 
          onClick={openNewCompanyDialog}
          className="flex items-center gap-2 corporate-gradient text-white hover-lift"
        >
          <Plus className="h-4 w-4" />
          Nova Empresa
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="corporate-card h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${company.active ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <Building className={`h-5 w-5 ${company.active ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <CardDescription>
                        {company.plan === 'free' ? 'Plano Gratuito' : 
                         company.plan === 'pro' ? 'Plano Profissional' : 'Plano Empresarial'}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge 
                    variant={company.active ? "default" : "destructive"}
                    className={`ml-2 ${company.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}
                  >
                    {company.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Domínio:</span>
                    <span className="text-sm font-medium">
                      {company.domain ? `${company.domain}.denuncieaqui.com` : 'Não definido'}
                    </span>
                  </div>
                  
                  {company.customDomain && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Domínio personalizado:</span>
                      <span className="text-sm font-medium">{company.customDomain}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Criado em:</span>
                    <span className="text-sm font-medium">
                      {new Date(company.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Categorias:</span>
                    <div className="flex gap-1">
                      {company.settings.reportCategories.slice(0, 2).map((category: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">{category}</Badge>
                      ))}
                      {company.settings.reportCategories.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{company.settings.reportCategories.length - 2}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                <Button variant="outline" size="sm" className="hover-lift">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurar
                </Button>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={company.active} 
                    onCheckedChange={() => handleToggleCompanyStatus(company.id, company.active)}
                  />
                  <span className="text-sm">
                    {company.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CompaniesTabContent;
