import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import IdentificationSection from './IdentificationSection';
import ReportDetailsSection from './ReportDetailsSection';

interface ReportFormContentProps {
  isAnonymous: boolean;
  setIsAnonymous: (isAnonymous: boolean) => void;
  reportData: {
    name: string;
    email: string;
    phone: string;
    category: string;
    description: string;
    date: string;
    location: string;
    involvedPeople: string;
    hasEvidence: boolean;
    evidenceDescription: string;
    files: File[];
    acceptTerms: boolean;
    [key: string]: any;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleFileChange: (files: File[]) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ReportFormContent = ({
  isAnonymous,
  setIsAnonymous,
  reportData,
  handleInputChange,
  handleCheckboxChange,
  handleSelectChange,
  handleFileChange,
  handleSubmit
}: ReportFormContentProps) => {
  return (
    <form onSubmit={handleSubmit} className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg shadow-md backdrop-blur-lg">
      <IdentificationSection 
        isAnonymous={isAnonymous}
        setIsAnonymous={setIsAnonymous}
        reportData={reportData}
        handleInputChange={handleInputChange}
      />
      
      <ReportDetailsSection 
        reportData={reportData}
        handleInputChange={handleInputChange}
        handleCheckboxChange={handleCheckboxChange}
        handleSelectChange={handleSelectChange}
        handleFileChange={handleFileChange}
      />
      
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="acceptTerms" 
            checked={reportData.acceptTerms}
            onCheckedChange={(checked) => 
              handleCheckboxChange('acceptTerms', checked as boolean)
            }
            required
          />
          <Label htmlFor="acceptTerms" className="text-sm text-gray-500 dark:text-gray-400">
            Declaro que as informações fornecidas são verdadeiras e estou ciente das responsabilidades legais em caso de falsidade.
            Concordo com a <Link to="#" className="text-primary hover:underline">Política de Privacidade</Link>.
          </Label>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <Button type="submit" size="lg">
          Enviar Denúncia
        </Button>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Ao enviar, você receberá um número de protocolo para acompanhar o andamento.
        </p>
      </div>
    </form>
  );
};

export default ReportFormContent;
