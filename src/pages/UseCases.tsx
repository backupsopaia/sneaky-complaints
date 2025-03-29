import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Shield, Users, BarChart3, FileText, Lock } from 'lucide-react';

const useCases = [
  {
    title: 'Empresas Privadas',
    description: 'Implemente um canal de denúncias seguro para sua empresa, garantindo conformidade com regulamentações e proteção de dados.',
    icon: Building2,
    features: [
      'Gestão de denúncias internas',
      'Conformidade com LGPD',
      'Relatórios e análises',
      'Gestão de casos'
    ]
  },
  {
    title: 'Instituições Financeiras',
    description: 'Sistema especializado para instituições financeiras, com foco em conformidade regulatória e gestão de riscos.',
    icon: Shield,
    features: [
      'Conformidade com regulamentações',
      'Gestão de riscos',
      'Monitoramento em tempo real',
      'Relatórios específicos'
    ]
  },
  {
    title: 'Organizações Não Governamentais',
    description: 'Plataforma adaptada para ONGs, permitindo gestão transparente de denúncias e proteção de denunciantes.',
    icon: Users,
    features: [
      'Gestão de voluntários',
      'Transparência',
      'Comunicação segura',
      'Relatórios de impacto'
    ]
  },
  {
    title: 'Empresas de Consultoria',
    description: 'Sistema para consultorias gerenciarem denúncias de múltiplos clientes de forma organizada e segura.',
    icon: BarChart3,
    features: [
      'Gestão multi-cliente',
      'Dashboard personalizado',
      'Análise de tendências',
      'Relatórios consolidados'
    ]
  },
  {
    title: 'Instituições Educacionais',
    description: 'Plataforma especializada para instituições de ensino, focada em gestão de denúncias acadêmicas.',
    icon: FileText,
    features: [
      'Gestão de denúncias acadêmicas',
      'Comunicação com alunos',
      'Relatórios educacionais',
      'Gestão de casos'
    ]
  },
  {
    title: 'Empresas de Tecnologia',
    description: 'Sistema moderno e seguro para empresas de tecnologia, com foco em proteção de dados e inovação.',
    icon: Lock,
    features: [
      'Segurança avançada',
      'Integração com APIs',
      'Análise de dados',
      'Automação de processos'
    ]
  }
];

const UseCases = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-6"
          >
            Casos de Utilização
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Descubra como diferentes setores utilizam nossa plataforma para gerenciar denúncias de forma eficiente e segura.
          </motion.p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <useCase.icon className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">{useCase.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <span className="text-primary mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Entre em contato conosco para saber mais sobre como podemos ajudar sua organização.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Fale Conosco
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default UseCases; 