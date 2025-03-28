
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ReportsHeader from './reports/ReportsHeader';
import StatsCards from './reports/StatsCards';
import PlanDistributionChart from './reports/PlanDistributionChart';
import RecentActivity from './reports/RecentActivity';

interface ReportsTabContentProps {
  companies: any[];
}

const ReportsTabContent = ({ companies }: ReportsTabContentProps) => {
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
          <ReportsHeader />
        </CardHeader>
        <CardContent>
          <StatsCards companies={companies} />
          
          <div className="space-y-6">
            <PlanDistributionChart companies={companies} />
            <RecentActivity />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReportsTabContent;
