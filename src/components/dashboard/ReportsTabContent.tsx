
import React from 'react';
import { Button } from "@/components/ui/button";
import ReportsList from '@/components/dashboard/ReportsList';

interface ReportsTabContentProps {
  handleCreateReport: () => void;
}

const ReportsTabContent = ({ handleCreateReport }: ReportsTabContentProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Denúncias</h1>
        <Button onClick={handleCreateReport}>
          Nova Denúncia
        </Button>
      </div>
      
      <ReportsList />
    </>
  );
};

export default ReportsTabContent;
