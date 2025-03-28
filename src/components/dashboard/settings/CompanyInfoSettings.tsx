
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useAuth } from '@/context/auth/useAuth';

const CompanyInfoSettings = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome da Empresa
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={user?.companyName}
          readOnly
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email de Contacto
        </label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={user?.email}
          readOnly
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Logótipo
        </label>
        <div className="mt-1 flex items-center">
          <div className="h-12 w-12 rounded border border-gray-300 bg-gray-100 flex items-center justify-center text-gray-400">
            <Shield size={24} />
          </div>
          <Button className="ml-4" variant="outline" size="sm">
            Alterar
          </Button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Plano Atual
        </label>
        <div className="flex items-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {user?.plan === 'free' ? 'Gratuito' : user?.plan === 'pro' ? 'Profissional' : 'Empresarial'}
          </span>
          {user?.plan === 'free' && (
            <Button className="ml-4" size="sm">
              Fazer Upgrade
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoSettings;
