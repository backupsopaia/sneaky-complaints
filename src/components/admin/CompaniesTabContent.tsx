
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import CompaniesHeader from './company/CompaniesHeader';
import CompanyCardGrid from './company/CompanyCardGrid';

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
      <CompaniesHeader openNewCompanyDialog={openNewCompanyDialog} />
      <CompanyCardGrid 
        companies={companies} 
        handleToggleCompanyStatus={handleToggleCompanyStatus} 
      />
    </motion.div>
  );
};

export default CompaniesTabContent;
