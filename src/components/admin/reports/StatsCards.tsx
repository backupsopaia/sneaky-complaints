
import React from 'react';
import { motion } from 'framer-motion';
import { Building, CheckCircle2, XCircle } from 'lucide-react';

interface StatsCardsProps {
  companies: any[];
}

const StatsCards = ({ companies }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="stat-card"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total de Empresas</p>
            <p className="text-2xl font-bold">{companies.length}</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="stat-card"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Empresas Ativas</p>
            <p className="text-2xl font-bold">{companies.filter(c => c.active).length}</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="stat-card"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
            <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Empresas Inativas</p>
            <p className="text-2xl font-bold">{companies.filter(c => !c.active).length}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsCards;
