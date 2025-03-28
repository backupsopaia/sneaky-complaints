
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CompaniesHeaderProps {
  openNewCompanyDialog: () => void;
}

const CompaniesHeader = ({ openNewCompanyDialog }: CompaniesHeaderProps) => {
  return (
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
  );
};

export default CompaniesHeader;
