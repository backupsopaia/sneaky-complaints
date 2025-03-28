
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Bell, FileText, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import ReportsSummary from './dashboard/ReportsSummary';
import ReportsCharts from './dashboard/ReportsCharts';
import RecentActivityList from './dashboard/RecentActivityList';
import NewReportsAlerts from './dashboard/NewReportsAlerts';

interface EnterpriseOverviewTabProps {
  reports: any[];
}

const EnterpriseOverviewTab = ({ reports }: EnterpriseOverviewTabProps) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>

      {/* Reports Summary Section */}
      <ReportsSummary reports={reports} />

      {/* New Reports Alerts */}
      <NewReportsAlerts reports={reports.filter(r => r.status === 'Novo')} />

      {/* Statistics Charts */}
      <ReportsCharts reports={reports} />

      {/* Recent Activities */}
      <RecentActivityList />
    </motion.div>
  );
};

export default EnterpriseOverviewTab;
