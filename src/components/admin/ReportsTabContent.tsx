
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Building, CheckCircle2, XCircle, Calendar, TrendingUp, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
        </CardHeader>
        <CardContent>
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
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Distribuição por Plano
              </h3>
              <div className="h-64 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                <div className="w-full max-w-md grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-40 relative overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ height: `${(companies.filter(c => c.plan === 'free').length / companies.length) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium mt-2">Gratuito</p>
                    <p className="text-xs text-gray-500">{companies.filter(c => c.plan === 'free').length}</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-40 relative overflow-hidden">
                      <div
                        className="bg-purple-500 h-full rounded-full"
                        style={{ height: `${(companies.filter(c => c.plan === 'pro').length / companies.length) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium mt-2">Profissional</p>
                    <p className="text-xs text-gray-500">{companies.filter(c => c.plan === 'pro').length}</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-40 relative overflow-hidden">
                      <div
                        className="bg-orange-500 h-full rounded-full"
                        style={{ height: `${(companies.filter(c => c.plan === 'enterprise').length / companies.length) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium mt-2">Empresarial</p>
                    <p className="text-xs text-gray-500">{companies.filter(c => c.plan === 'enterprise').length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Atividade Recente
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                        <Building className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nova empresa cadastrada</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Há {item} hora{item > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReportsTabContent;
