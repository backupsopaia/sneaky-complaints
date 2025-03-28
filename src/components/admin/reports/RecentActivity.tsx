
import React from 'react';
import { Calendar, Building, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/hooks/use-toast";

const RecentActivity = () => {
  // Função para simular uma nova notificação
  const triggerNotification = (message: string) => {
    toast({
      title: "Nova Atividade",
      description: message,
      action: (
        <button 
          onClick={() => console.log("Notification clicked")} 
          className="bg-primary text-white px-3 py-1 rounded-md text-xs"
        >
          Ver
        </button>
      )
    });
  };

  // Lista de atividades
  const activities = [
    { id: 1, title: "Nova empresa cadastrada", time: "Há 1 hora", icon: Building },
    { id: 2, title: "Nova denúncia recebida", time: "Há 2 horas", icon: Bell },
    { id: 3, title: "Relatório mensal gerado", time: "Há 3 horas", icon: Calendar }
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Calendar className="mr-2 h-5 w-5 text-primary" />
        Atividade Recente
      </h3>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="space-y-4">
          {activities.map((item) => (
            <motion.div 
              key={item.id} 
              className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              whileHover={{ x: 5 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: item.id * 0.1 }}
              onClick={() => triggerNotification(item.title)}
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
