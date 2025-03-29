import React from 'react';

const BrandingSettings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configurações de Marca</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Logo</h3>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
            <p className="text-gray-500">Arraste e solte o logo aqui ou clique para selecionar</p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Cores</h3>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Cor Primária</label>
            <input type="color" className="w-full h-10 rounded" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Cor Secundária</label>
            <input type="color" className="w-full h-10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSettings; 