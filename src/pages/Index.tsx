
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingTable from '@/components/PricingTable';
import { Shield, Lock, MessageSquare, BarChart, FileText, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-24 relative bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Canal de denúncias seguro e eficiente para sua empresa
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Implemente um canal de denúncias em minutos, 
                garantindo compliance, anonimato e gestão eficiente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Começar Gratuitamente
                  </Button>
                </Link>
                <Link to="/report">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Fazer Denúncia
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-md">
                <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-medium py-1 px-2 rounded-full">
                  Anônimo
                </div>
                <h3 className="text-lg font-semibold mb-4">Nova Denúncia</h3>
                <div className="space-y-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">
                      "Gostaria de reportar uma situação de assédio moral que presenciei no departamento de vendas..."
                    </p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-md">
                    <p className="text-sm">
                      "Obrigado por sua denúncia. Ela foi registrada com o protocolo #4872 e será investigada..."
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Lock size={14} />
                  <span>Comunicação segura e criptografada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trusted By Section */}
      <section className="py-8 bg-white border-t border-b border-gray-100">
        <div className="container px-4">
          <p className="text-center text-sm text-gray-500 mb-6">UTILIZADO POR EMPRESAS DE TODOS OS PORTES</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
            <div className="h-8 w-28 bg-gray-300 rounded"></div>
            <div className="h-8 w-20 bg-gray-300 rounded"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white" id="features">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recursos que fazem a diferença</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nossa plataforma oferece tudo o que você precisa para implementar 
              um canal de denúncias eficaz e compliant.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Anonimato Garantido</h3>
              <p className="text-gray-600">
                Garantimos o anonimato dos denunciantes, promovendo um ambiente seguro para reportar irregularidades.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comunicação Segura</h3>
              <p className="text-gray-600">
                Canal de comunicação bidirecional e criptografado entre gestores e denunciantes.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Análise e Relatórios</h3>
              <p className="text-gray-600">
                Dashboard com métricas e relatórios detalhados para acompanhamento de casos e tendências.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalização Completa</h3>
              <p className="text-gray-600">
                Personalize o canal com a identidade da sua empresa, formulários e políticas próprias.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança de Dados</h3>
              <p className="text-gray-600">
                Armazenamento seguro e criptografado das informações, em conformidade com a LGPD.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiusuários</h3>
              <p className="text-gray-600">
                Configure diferentes níveis de acesso para gestores, investigadores e administradores.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para implementar seu canal de denúncias?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comece hoje mesmo, gratuitamente, e garanta mais segurança e conformidade para sua empresa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Criar Conta Grátis
              </Button>
            </Link>
            <Link to="#features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <PricingTable />
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tudo o que você precisa saber sobre nossa plataforma de denúncias.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Como é garantido o anonimato dos denunciantes?
              </h3>
              <p className="text-gray-600">
                Nossa plataforma não armazena informações que possam identificar o denunciante, 
                como IP, cookies ou dados pessoais, a menos que ele opte por se identificar. 
                Toda comunicação é criptografada e o acesso às denúncias é restrito.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Quanto tempo leva para implementar o canal de denúncias?
              </h3>
              <p className="text-gray-600">
                Em apenas alguns minutos! Após o cadastro, você pode personalizar seu canal 
                com a marca da empresa e já começar a receber denúncias. A configuração completa, 
                com políticas e formulários personalizados, pode levar algumas horas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                O sistema está em conformidade com a LGPD?
              </h3>
              <p className="text-gray-600">
                Sim, nossa plataforma foi desenvolvida considerando todos os requisitos 
                da Lei Geral de Proteção de Dados, com medidas técnicas e organizacionais 
                que garantem a proteção dos dados pessoais processados.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Posso integrar com os sistemas da minha empresa?
              </h3>
              <p className="text-gray-600">
                Sim, nos planos Empresarial oferecemos APIs para integração com 
                sistemas internos, como HRIS, ferramentas de compliance e sistemas de ticket.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
