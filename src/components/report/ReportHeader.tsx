
import React from 'react';
import { Shield } from "lucide-react";

const ReportHeader = () => {
  return (
    <div className="mb-8 text-center">
      <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
        <Shield className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Canal de Denúncias</h1>
      <p className="text-gray-600 max-w-xl mx-auto">
        Faça sua denúncia de forma segura. Você pode optar por se identificar ou permanecer anônimo.
      </p>
    </div>
  );
};

export default ReportHeader;
