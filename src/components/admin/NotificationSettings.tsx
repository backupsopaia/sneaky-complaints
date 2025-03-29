import React from 'react';
import { Button } from "@/components/ui/button";

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configurações de Notificações</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <h3 className="font-semibold">Notificações por Email</h3>
            <p className="text-sm text-gray-500">Receber notificações por email sobre novas denúncias</p>
          </div>
          <Button variant="outline">Configurar</Button>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <h3 className="font-semibold">Notificações Push</h3>
            <p className="text-sm text-gray-500">Receber notificações push no navegador</p>
          </div>
          <Button variant="outline">Configurar</Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings; 