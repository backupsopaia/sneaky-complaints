
import React from 'react';
import { Shield, AlertTriangle } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TwoFactorModalProps {
  showTwoFactor: boolean;
  setShowTwoFactor: (show: boolean) => void;
  twoFactorCode: string;
  setTwoFactorCode: (code: string) => void;
  handleTwoFactorSubmit: () => Promise<void>;
  generateRandomCode: () => void;
}

const TwoFactorModal: React.FC<TwoFactorModalProps> = ({
  showTwoFactor,
  setShowTwoFactor,
  twoFactorCode,
  setTwoFactorCode,
  handleTwoFactorSubmit,
  generateRandomCode
}) => {
  return (
    <Dialog open={showTwoFactor} onOpenChange={setShowTwoFactor}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Autenticação de Dois Fatores
          </DialogTitle>
          <DialogDescription>
            Digite o código de 6 dígitos do seu aplicativo autenticador.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <AlertTriangle className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-700 dark:text-blue-300">
              <strong>Demonstração:</strong> Qualquer código de 6 dígitos será aceito.
            </AlertDescription>
          </Alert>
          
          <InputOTP maxLength={6} value={twoFactorCode} onChange={setTwoFactorCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          
          <div className="flex w-full gap-2 mt-2">
            <Button 
              variant="outline" 
              onClick={generateRandomCode}
              className="flex-1"
            >
              Gerar código aleatório
            </Button>
            
            <Button 
              onClick={handleTwoFactorSubmit}
              disabled={twoFactorCode.length !== 6}
              className="flex-1"
            >
              Verificar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorModal;
