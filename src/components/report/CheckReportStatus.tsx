
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidTrackingCode } from '@/utils/trackingCode';
import { Search } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface CheckReportStatusProps {
  onClose?: () => void;
}

const CheckReportStatus = ({ onClose }: CheckReportStatusProps) => {
  const [trackingCode, setTrackingCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [reportStatus, setReportStatus] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!trackingCode) {
      toast({
        variant: "destructive",
        title: "Código necessário",
        description: "Por favor, insira o código de acompanhamento da denúncia.",
      });
      return;
    }

    if (!isValidTrackingCode(trackingCode)) {
      toast({
        variant: "destructive",
        title: "Código inválido",
        description: "O formato do código de acompanhamento é inválido. O formato correto é AAA-1234-BBB.",
      });
      return;
    }

    // Simulate searching
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      
      // In a real application, this would fetch the report status from the backend
      // For now, we'll simulate a random status
      const statuses = [
        "Em análise inicial",
        "Sob investigação",
        "Aguardando informações adicionais",
        "Em fase de conclusão",
        "Resolvida"
      ];
      
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setReportStatus(randomStatus);
      
      toast({
        title: "Status encontrado",
        description: `Denúncia ${trackingCode} está: ${randomStatus}`,
      });
    }, 1500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Verificar Status da Denúncia</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Digite o código de acompanhamento para verificar o status atual da sua denúncia.
        </p>
        
        <div className="flex gap-2">
          <Input
            placeholder="Exemplo: ABC-1234-XYZ"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
            className="flex-1"
          />
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
          >
            {isSearching ? "Buscando..." : "Verificar"}
            {!isSearching && <Search className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {reportStatus && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium mb-2">Resultado da Consulta:</h3>
          <p className="text-gray-700">
            Denúncia <span className="font-mono font-semibold">{trackingCode}</span>
          </p>
          <p className="text-gray-700">
            Status: <span className="font-semibold text-primary">{reportStatus}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Última atualização: {new Date().toLocaleDateString()}
          </p>
        </div>
      )}
      
      <p className="text-sm text-gray-500 mt-4">
        Sua privacidade é importante. Nenhuma informação pessoal é exibida ao consultar o status.
      </p>
    </div>
  );
};

export default CheckReportStatus;
