
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Calendar, FileText, CheckCircle2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for recent activity
const recentActivities = [
  { 
    id: 1, 
    user: 'Carolina Silva', 
    action: 'criou uma nova denúncia', 
    subject: 'Assédio no departamento de vendas',
    time: 'Há 1 hora',
    icon: FileText,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
  },
  { 
    id: 2, 
    user: 'Pedro Santos', 
    action: 'atribuiu-se à denúncia', 
    subject: 'Suspeita de fraude em contratos',
    time: 'Há 2 horas',
    icon: User,
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
  },
  { 
    id: 3, 
    user: 'Mariana Costa', 
    action: 'alterou o status para Resolvido', 
    subject: 'Violação de política de segurança',
    time: 'Há 3 horas',
    icon: CheckCircle2,
    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
  },
  { 
    id: 4, 
    user: 'André Oliveira', 
    action: 'visualizou a denúncia', 
    subject: 'Conflito de interesse com fornecedor',
    time: 'Há 4 horas',
    icon: Eye,
    color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
  },
];

const RecentActivityList = () => {
  const { toast } = useToast();

  const handleActivityClick = (activity: any) => {
    toast({
      title: "Atividade selecionada",
      description: `${activity.user} ${activity.action}: ${activity.subject}`,
    });
  };

  return (
    <Card className="bg-white dark:bg-card">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Atividades Recentes dos Colaboradores
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
              onClick={() => handleActivityClick(activity)}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{activity.user}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {activity.action} <span className="font-medium">{activity.subject}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityList;
