
import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { isValidTrackingCode } from '@/utils/trackingCode';

interface CheckReportStatusProps {
  onClose?: () => void;
}

const CheckReportStatus = ({ onClose }: CheckReportStatusProps) => {
  const { toast } = useToast();
  const [trackingCode, setTrackingCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reportStatus, setReportStatus] = useState<{
    status: string;
    date: string;
    lastUpdate: string;
    category: string;
    messages: number;
  } | null>(null);

  const handleTrackingCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingCode(e.target.value.toUpperCase());
  };

  const handleCheckStatus = () => {
    if (!trackingCode) {
      toast({
        variant: "destructive",
        title: "Código vazio",
        description: "Por favor, insira um código de rastreamento.",
      });
      return;
    }

    if (!isValidTrackingCode(trackingCode)) {
      toast({
        variant: "destructive",
        title: "Código inválido",
        description: "O formato do código deve ser AAA-1234-BBB.",
      });
      return;
    }

    setIsLoading(true);

    // Simulando uma requisição à API
    setTimeout(() => {
      // Mockando uma resposta para demonstração
      if (trackingCode === 'ABC-1234-XYZ') {
        setReportStatus({
          status: 'Em Análise',
          date: '15/05/2023',
          lastUpdate: '17/05/2023',
          category: 'Assédio Moral',
          messages: 2
        });
      } else {
        setReportStatus({
          status: 'Investigação',
          date: '10/06/2023',
          lastUpdate: '15/06/2023',
          category: 'Fraude',
          messages: 0
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em Análise':
        return 'bg-blue-100 text-blue-800';
      case 'Investigação':
        return 'bg-purple-100 text-purple-800';
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-lg">Verificar Status da Denúncia</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Digite o código de rastreamento"
              value={trackingCode}
              onChange={handleTrackingCodeChange}
              className="pl-8"
              maxLength={12}
            />
          </div>
          <Button 
            onClick={handleCheckStatus} 
            disabled={isLoading}
            className="whitespace-nowrap"
          >
            {isLoading ? "Verificando..." : "Verificar Status"}
          </Button>
        </div>
        
        {reportStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-md p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Protocolo: {trackingCode}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reportStatus.status)}`}>
                {reportStatus.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Categoria</p>
                <p>{reportStatus.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Data de Registro</p>
                <p>{reportStatus.date}</p>
              </div>
              <div>
                <p className="text-gray-500">Última Atualização</p>
                <p>{reportStatus.lastUpdate}</p>
              </div>
              <div>
                <p className="text-gray-500">Mensagens</p>
                <p>{reportStatus.messages} novas</p>
              </div>
            </div>
            
            {reportStatus.messages > 0 && (
              <div className="bg-primary/10 p-3 rounded flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm">
                  Você tem mensagens não lidas. Para visualizá-las, faça login no sistema ou acesse a página de denúncias.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </CardContent>
      
      {onClose && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onClose}
          >
            Voltar
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CheckReportStatus;
