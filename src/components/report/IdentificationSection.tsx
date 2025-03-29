import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, UserX } from "lucide-react";

interface IdentificationSectionProps {
  isAnonymous: boolean;
  setIsAnonymous: (isAnonymous: boolean) => void;
  reportData: {
    name: string;
    email: string;
    phone: string;
    [key: string]: any;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const IdentificationSection = ({
  isAnonymous,
  setIsAnonymous,
  reportData,
  handleInputChange
}: IdentificationSectionProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Escolha o Tipo de Identificação</h2>
      <RadioGroup 
        defaultValue={isAnonymous ? "anonymous" : "identified"}
        onValueChange={(value) => setIsAnonymous(value === "anonymous")}
        className="flex flex-col space-y-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="anonymous" id="anonymous" />
          <Label htmlFor="anonymous" className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
            <UserX size={18} /> Fazer denúncia anônima
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="identified" id="identified" />
          <Label htmlFor="identified" className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300">
            <User size={18} /> Identificar-me (confidencial)
          </Label>
        </div>
      </RadioGroup>

      {!isAnonymous && (
        <div className="mt-6 space-y-4 p-4 bg-white/30 dark:bg-gray-900/30 rounded-md backdrop-blur-lg">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">Seus Dados (confidenciais)</h3>
          
          <div>
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nome Completo</Label>
            <Input
              id="name"
              name="name"
              placeholder="Seu nome completo"
              value={reportData.name}
              onChange={handleInputChange}
              className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={reportData.email}
              onChange={handleInputChange}
              className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Telefone (opcional)</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="(00) 00000-0000"
              value={reportData.phone}
              onChange={handleInputChange}
              className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
            />
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Suas informações pessoais serão mantidas em sigilo e usadas apenas para contato durante a investigação, se necessário.
          </p>
        </div>
      )}
    </div>
  );
};

export default IdentificationSection;
