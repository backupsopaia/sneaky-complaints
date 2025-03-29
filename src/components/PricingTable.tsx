import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const PricingTable = () => {
  return (
    <div className="container mx-auto px-4 py-16" id="pricing">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Planos transparentes, sem surpresas</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Escolha o plano que melhor se adapta às necessidades da sua empresa, 
          com recursos essenciais de compliance e gestão de denúncias.
        </p>
        <Link to="/pricing">
          <Button variant="outline" className="group">
            Ver Todos os Planos
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col h-full">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Inicial</h3>
            <p className="text-gray-600 mb-6">Para pequenas empresas iniciando seu programa de compliance.</p>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">Grátis</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Até 20 colaboradores</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Canal de denúncias básico</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Personalização limitada</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Anonimato para denunciantes</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Relatório mensal básico</span>
            </li>
          </ul>
          
          <Link to="/register?plan=free">
            <Button variant="outline" className="w-full">Começar Grátis</Button>
          </Link>
        </div>
        
        {/* Pro Plan */}
        <div className="border border-primary rounded-lg shadow-md p-8 flex flex-col h-full relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-sm font-medium py-1 px-3 rounded-full">
            Mais Popular
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Profissional</h3>
            <p className="text-gray-600 mb-6">Para empresas em crescimento que precisam de mais recursos.</p>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">20.000 Kz</span>
              <span className="text-gray-500 ml-2">/mês</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Até 100 colaboradores</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Canal de denúncias personalizado</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Categorização de denúncias</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Comunicação com denunciantes</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Dashboard e relatórios avançados</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Suporte por email</span>
            </li>
          </ul>
          
          <Link to="/register?plan=pro">
            <Button className="w-full">Começar Agora</Button>
          </Link>
        </div>
        
        {/* Enterprise Plan */}
        <div className="border border-gray-200 rounded-lg shadow-sm p-8 flex flex-col h-full">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Empresarial</h3>
            <p className="text-gray-600 mb-6">Para grandes organizações com necessidades avançadas.</p>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">Personalizado</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-8 flex-grow">
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Colaboradores ilimitados</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Canal de denúncias totalmente personalizado</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Integrações com sistemas internos</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Workflow de investigação avançado</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Análise de dados e insights</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>API para integração</span>
            </li>
            <li className="flex items-start">
              <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Suporte prioritário 24/7</span>
            </li>
          </ul>
          
          <Link to="/register?plan=enterprise">
            <Button variant="outline" className="w-full">Fale com Vendas</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
