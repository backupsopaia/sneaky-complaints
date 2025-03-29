import React from 'react';
import { motion } from 'framer-motion';
import StatsGrid from '@/components/dashboard/StatsGrid';
import ReportsChart from '@/components/dashboard/ReportsChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card-motion';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Aqui está um resumo das denúncias.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nova Denúncia
          </Button>
        </div>
      </motion.div>

      <StatsGrid />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-6">
        <ReportsChart />
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Denúncias Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium">Denúncia #{2023100 + i}</h4>
                    <p className="text-xs text-muted-foreground">Há 2 horas</p>
                  </div>
                  <div className="px-2 py-1 rounded text-xs bg-primary/10 text-primary">
                    Nova
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
