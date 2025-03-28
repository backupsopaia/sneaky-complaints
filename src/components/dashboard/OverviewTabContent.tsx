
import React from 'react';
import { Button } from "@/components/ui/button";
import ReportsList from '@/components/dashboard/ReportsList';
import ReportsStats from '@/components/dashboard/ReportsStats';

interface OverviewTabContentProps {
  handleCreateReport: () => void;
}

const OverviewTabContent = ({ handleCreateReport }: OverviewTabContentProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Visão Geral</h1>
        <Button onClick={handleCreateReport}>
          Nova Denúncia
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ReportsStats />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <ReportsList />
      </div>
    </>
  );
};

export default OverviewTabContent;
