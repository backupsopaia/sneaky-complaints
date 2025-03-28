
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface PlanDistributionChartProps {
  companies: any[];
}

const PlanDistributionChart = ({ companies }: PlanDistributionChartProps) => {
  return (
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
  );
};

export default PlanDistributionChart;
