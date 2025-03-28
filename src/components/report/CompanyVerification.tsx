
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Shield } from 'lucide-react';

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
  return (
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
  );
};

export default CompanyVerification;
