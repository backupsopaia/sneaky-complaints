
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/auth/useAuth';

const WhistleblowerChannelSettings = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL do Canal
        </label>
        <div className="flex">
          <input
            type="text"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md"
            value={`denuncieaqui.com/c/${user?.companyName?.toLowerCase().replace(/\s+/g, '-')}`}
            readOnly
          />
          <Button className="rounded-l-none" variant="outline">
            Copiar
          </Button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título do Canal
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Ex: Canal de Denúncias da Empresa XYZ"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mensagem de Boas-vindas
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
          placeholder="Mensagem que aparecerá para denunciantes"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categorias de Denúncias
        </label>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Assédio Moral
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Assédio Sexual
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Corrupção
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Fraude
          </span>
          <Button variant="outline" size="sm" className="h-5">
            + Adicionar
          </Button>
        </div>
      </div>
      
      <div className="pt-4">
        <Button>Guardar Alterações</Button>
      </div>
    </div>
  );
};

export default WhistleblowerChannelSettings;
