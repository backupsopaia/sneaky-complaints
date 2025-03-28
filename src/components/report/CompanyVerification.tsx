
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Search } from 'lucide-react';
import CheckReportStatus from './CheckReportStatus';

interface CompanyVerificationProps {
  companyCode: string;
  setCompanyCode: (code: string) => void;
  onVerifyCompany: () => void;
}

const CompanyVerification = ({ 
  companyCode, 
  setCompanyCode, 
  onVerifyCompany 
}: CompanyVerificationProps) => {
  const [showCheckStatus, setShowCheckStatus] = useState(false);
  
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Verificar Empresa</h2>
        <p className="text-gray-600 mb-4">
          Informe o código da empresa para a qual deseja fazer a denúncia.
        </p>
        
        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="Código da empresa" 
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
            className="flex-1"
          />
          <Button onClick={onVerifyCompany}>Verificar</Button>
        </div>
        
        <p className="text-sm text-gray-500">
          O código está disponível no site interno, intranet ou materiais de comunicação da empresa.
        </p>
      </div>
      
      {!showCheckStatus ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-medium mb-2">Já possui um protocolo?</h3>
          <p className="text-gray-600 mb-4">
            Se você já fez uma denúncia e deseja verificar o status, clique no botão abaixo.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setShowCheckStatus(true)}
            className="w-full"
          >
            <Search className="mr-2 h-4 w-4" />
            Consultar Status da Denúncia
          </Button>
        </div>
      ) : (
        <CheckReportStatus onClose={() => setShowCheckStatus(false)} />
      )}
    </div>
  );
};

export default CompanyVerification;
