
import React from 'react';
import { Calendar, Building } from 'lucide-react';

const RecentActivity = () => {
  return (
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
  );
};

export default RecentActivity;
