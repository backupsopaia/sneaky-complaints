
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from 'framer-motion';

const ReportsHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <motion.div 
        className="p-2 bg-primary/10 rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <BarChart3 className="h-5 w-5 text-primary" />
      </motion.div>
      <div>
        <CardTitle className="text-xl md:text-2xl">Relatórios e Estatísticas</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Visualize dados consolidados de todas as empresas
        </CardDescription>
      </div>
    </div>
  );
};

export default ReportsHeader;
