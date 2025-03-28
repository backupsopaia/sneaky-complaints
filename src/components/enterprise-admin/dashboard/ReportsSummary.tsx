
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, CheckCircle2 } from 'lucide-react';

interface ReportsSummaryProps {
  reports: any[];
}

const ReportsSummary = ({ reports }: ReportsSummaryProps) => {
  // Calculate counts for each status
  const newReports = reports.filter(report => report.status === 'Novo').length;
  const inProgressReports = reports.filter(report => report.status === 'Em Análise').length;
  const resolvedReports = reports.filter(report => report.status === 'Resolvido').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="stat-card"
      >
        <Card className="bg-white dark:bg-card hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Novas Denúncias</p>
                <p className="text-2xl font-bold">{newReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="stat-card"
      >
        <Card className="bg-white dark:bg-card hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Em Análise</p>
                <p className="text-2xl font-bold">{inProgressReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="stat-card"
      >
        <Card className="bg-white dark:bg-card hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Resolvidas</p>
                <p className="text-2xl font-bold">{resolvedReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReportsSummary;
