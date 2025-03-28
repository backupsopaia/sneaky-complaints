
import React from 'react';
import { Shield, Lock, MessageSquare, BarChart, FileText, Users } from "lucide-react";

const FeaturesSection = () => {
  return (
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
          <FeatureCard 
            icon={<Shield className="h-6 w-6 text-primary" />}
            title="Anonimato Garantido"
            description="Garantimos o anonimato dos denunciantes, promovendo um ambiente seguro para reportar irregularidades."
          />
          
          <FeatureCard 
            icon={<MessageSquare className="h-6 w-6 text-primary" />}
            title="Comunicação Segura"
            description="Canal de comunicação bidirecional e criptografado entre gestores e denunciantes."
          />
          
          <FeatureCard 
            icon={<BarChart className="h-6 w-6 text-primary" />}
            title="Análise e Relatórios"
            description="Dashboard com métricas e relatórios detalhados para acompanhamento de casos e tendências."
          />
          
          <FeatureCard 
            icon={<FileText className="h-6 w-6 text-primary" />}
            title="Personalização Completa"
            description="Personalize o canal com a identidade da sua empresa, formulários e políticas próprias."
          />
          
          <FeatureCard 
            icon={<Lock className="h-6 w-6 text-primary" />}
            title="Segurança de Dados"
            description="Armazenamento seguro e criptografado das informações, em conformidade com a LGPD."
          />
          
          <FeatureCard 
            icon={<Users className="h-6 w-6 text-primary" />}
            title="Multiusuários"
            description="Configure diferentes níveis de acesso para gestores, investigadores e administradores."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-6 border border-gray-200 rounded-lg">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default FeaturesSection;
