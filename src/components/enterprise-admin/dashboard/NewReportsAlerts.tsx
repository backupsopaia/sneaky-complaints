
import React from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Bell, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface NewReportsAlertsProps {
  reports: any[];
}

const NewReportsAlerts = ({ reports }: NewReportsAlertsProps) => {
  const { toast } = useToast();
  
  if (reports.length === 0) {
    return null;
  }

  const viewReportDetails = (report: any) => {
    // In a real app, navigate to report details page
    toast({
      title: "Visualizando denúncia",
      description: `Abrindo detalhes da denúncia: ${report.title}`,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center">
        <Bell className="mr-2 h-5 w-5 text-primary" />
        Alertas de Novas Denúncias
      </h2>
      
      {reports.map((report, index) => (
        <motion.div
          key={report.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Alert className="border-l-4 border-primary">
            <FileText className="h-4 w-4" />
            <AlertTitle className="font-medium">{report.title}</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              <div>
                <span className="text-sm">Categoria: <strong>{report.category}</strong></span>
                <span className="text-sm ml-4">Prioridade: <strong>{report.priority}</strong></span>
                <span className="text-sm ml-4">Data: <strong>{report.date}</strong></span>
              </div>
              <Button size="sm" onClick={() => viewReportDetails(report)}>
                Ver Detalhes
              </Button>
            </AlertDescription>
          </Alert>
        </motion.div>
      ))}
    </div>
  );
};

export default NewReportsAlerts;
