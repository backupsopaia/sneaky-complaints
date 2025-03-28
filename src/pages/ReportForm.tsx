
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Shield, User, UserX } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
          <div className="mb-8 text-center">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Canal de Denúncias</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Faça sua denúncia de forma segura. Você pode optar por se identificar ou permanecer anônimo.
            </p>
          </div>
          
          {!companyVerified ? (
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
                <Button onClick={handleVerifyCompany}>Verificar</Button>
              </div>
              
              <p className="text-sm text-gray-500">
                O código está disponível no site interno, intranet ou materiais de comunicação da empresa.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Escolha o Tipo de Identificação</h2>
                <RadioGroup 
                  defaultValue={isAnonymous ? "anonymous" : "identified"}
                  onValueChange={(value) => setIsAnonymous(value === "anonymous")}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="anonymous" id="anonymous" />
                    <Label htmlFor="anonymous" className="flex items-center gap-2 cursor-pointer">
                      <UserX size={18} /> Fazer denúncia anônima
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="identified" id="identified" />
                    <Label htmlFor="identified" className="flex items-center gap-2 cursor-pointer">
                      <User size={18} /> Identificar-me (confidencial)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {!isAnonymous && (
                <div className="mb-6 space-y-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Seus Dados (confidenciais)</h3>
                  
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Seu nome completo"
                      value={reportData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={reportData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefone (opcional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="(00) 00000-0000"
                      value={reportData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Suas informações pessoais serão mantidas em sigilo e usadas apenas para contato durante a investigação, se necessário.
                  </p>
                </div>
              )}
              
              <div className="mb-6 space-y-4">
                <h3 className="text-lg font-medium mb-2">Detalhes da Denúncia</h3>
                
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assedio-moral">Assédio Moral</SelectItem>
                      <SelectItem value="assedio-sexual">Assédio Sexual</SelectItem>
                      <SelectItem value="corrupcao">Corrupção</SelectItem>
                      <SelectItem value="fraude">Fraude</SelectItem>
                      <SelectItem value="conflito-interesses">Conflito de Interesses</SelectItem>
                      <SelectItem value="discriminacao">Discriminação</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição Detalhada</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Descreva a situação com o máximo de detalhes possível"
                    value={reportData.description}
                    onChange={handleInputChange}
                    className="min-h-[120px]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="date">Data da Ocorrência</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={reportData.date}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Departamento, unidade, local físico, etc."
                    value={reportData.location}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="involvedPeople">Pessoas Envolvidas</Label>
                  <Textarea
                    id="involvedPeople"
                    name="involvedPeople"
                    placeholder="Quem são as pessoas envolvidas? (nomes, cargos, etc.)"
                    value={reportData.involvedPeople}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasEvidence" 
                      checked={reportData.hasEvidence}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('hasEvidence', checked as boolean)
                      }
                    />
                    <Label htmlFor="hasEvidence">
                      Possuo evidências que comprovam esta denúncia
                    </Label>
                  </div>
                  
                  {reportData.hasEvidence && (
                    <div>
                      <Label htmlFor="evidenceDescription">Descreva as Evidências</Label>
                      <Textarea
                        id="evidenceDescription"
                        name="evidenceDescription"
                        placeholder="Descreva quais evidências você possui (documentos, e-mails, fotos, etc.)"
                        value={reportData.evidenceDescription}
                        onChange={handleInputChange}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Não anexe arquivos neste momento. Se necessário, a empresa entrará em contato posteriormente para obter as evidências.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
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
                  <Label htmlFor="acceptTerms" className="text-sm text-gray-600">
                    Declaro que as informações fornecidas são verdadeiras e estou ciente das responsabilidades legais em caso de falsidade.
                    Concordo com a <Link to="#" className="text-primary hover:underline">Política de Privacidade</Link>.
                  </Label>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <Button type="submit" size="lg">
                  Enviar Denúncia
                </Button>
                <p className="text-sm text-center text-gray-500">
                  Ao enviar, você receberá um número de protocolo para acompanhar o andamento.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReportForm;
