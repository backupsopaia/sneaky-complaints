
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { CardTitle, CardDescription } from "@/components/ui/card";

const ReportsHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        <BarChart3 className="h-5 w-5 text-primary" />
      </div>
      <div>
        <CardTitle>Relatórios e Estatísticas</CardTitle>
        <CardDescription>
          Visualize dados consolidados de todas as empresas
        </CardDescription>
      </div>
    </div>
  );
};

export default ReportsHeader;
