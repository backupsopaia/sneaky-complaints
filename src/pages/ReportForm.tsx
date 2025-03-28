
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CompanyVerification from '@/components/report/CompanyVerification';
import ReportHeader from '@/components/report/ReportHeader';
import ReportFormContent from '@/components/report/ReportFormContent';

const ReportForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [companyCode, setCompanyCode] = useState('');
  const [companyVerified, setCompanyVerified] = useState(false);
  const [reportData, setReportData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    date: '',
    location: '',
    involvedPeople: '',
    hasEvidence: false,
    evidenceDescription: '',
    acceptTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value
    });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setReportData({
      ...reportData,
      [name]: checked
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setReportData({
      ...reportData,
      [name]: value
    });
  };

  const handleVerifyCompany = () => {
    // In a real scenario, this would verify the company code against a database
    if (companyCode) {
      setCompanyVerified(true);
      toast({
        title: "Empresa verificada",
        description: "Você está fazendo uma denúncia para a empresa demonstração.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Código inválido",
        description: "Por favor, insira um código de empresa válido.",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportData.acceptTerms) {
      toast({
        variant: "destructive",
        title: "Termos não aceitos",
        description: "Você precisa aceitar os termos para enviar a denúncia.",
      });
      return;
    }
    
    if (!companyVerified) {
      toast({
        variant: "destructive",
        title: "Empresa não verificada",
        description: "Por favor, verifique o código da empresa antes de enviar.",
      });
      return;
    }
    
    // In a real application, this would send the report to the backend
    toast({
      title: "Denúncia enviada",
      description: "Seu protocolo é #4872. Guarde este número para acompanhar o status.",
    });
    
    // Redirect to confirmation page
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 py-12">
        <div className="container px-4 mx-auto max-w-3xl">
          <ReportHeader />
          
          {!companyVerified ? (
            <CompanyVerification 
              companyCode={companyCode}
              setCompanyCode={setCompanyCode}
              onVerifyCompany={handleVerifyCompany}
            />
          ) : (
            <ReportFormContent 
              isAnonymous={isAnonymous}
              setIsAnonymous={setIsAnonymous}
              reportData={reportData}
              handleInputChange={handleInputChange}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectChange={handleSelectChange}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReportForm;
