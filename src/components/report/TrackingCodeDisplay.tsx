
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface TrackingCodeDisplayProps {
  trackingCode: string;
  onDone: () => void;
}

const TrackingCodeDisplay = ({ trackingCode, onDone }: TrackingCodeDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Denúncia Enviada!</h2>
        <p className="text-gray-600 mb-4">
          Sua denúncia foi registrada com sucesso. Utilize o código abaixo para acompanhar o status da sua denúncia.
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Seu código de acompanhamento:</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="bg-gray-100 px-4 py-3 rounded-md text-xl font-mono font-bold tracking-wider">
            {trackingCode}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            className="h-10 w-10"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-4">
          Guarde este código em um local seguro. Você precisará dele para verificar o status da sua denúncia.
        </p>
      </div>

      <Button onClick={onDone} className="w-full">
        Concluir
      </Button>
    </div>
  );
};

export default TrackingCodeDisplay;
