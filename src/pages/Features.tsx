import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  BarChart3, 
  Bell, 
  FileText, 
  Users, 
  MessageSquare, 
  Zap, 
  Globe, 
  Settings,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    title: 'Segurança Avançada',
    description: 'Proteção de dados com criptografia de ponta a ponta e conformidade com LGPD.',
    icon: Shield,
    details: [
      'Criptografia AES-256',
      'Conformidade com LGPD',
      'Proteção contra vazamentos',
      'Backup automático'
    ]
  },
  {
    title: 'Anonimato Garantido',
    description: 'Sistema que garante o anonimato dos denunciantes, promovendo um ambiente seguro para relatos.',
    icon: Lock,
    details: [
      'Identidade protegida',
      'IP mascarado',
      'Dados sensíveis ocultos',
      'Comunicação segura'
    ]
  },
  {
    title: 'Analytics e Relatórios',
    description: 'Painel de controle com métricas e insights para gestão eficiente de denúncias.',
    icon: BarChart3,
    details: [
      'Dashboard interativo',
      'Relatórios personalizados',
      'Análise de tendências',
      'Exportação de dados'
    ]
  },
  {
    title: 'Notificações Inteligentes',
    description: 'Sistema de alertas para manter sua equipe informada sobre novas denúncias e atualizações.',
    icon: Bell,
    details: [
      'Alertas em tempo real',
      'Notificações por email',
      'Priorização automática',
      'Configurações personalizadas'
    ]
  },
  {
    title: 'Gestão de Casos',
    description: 'Ferramentas completas para acompanhamento e resolução de denúncias.',
    icon: FileText,
    details: [
      'Fluxo de trabalho personalizado',
      'Histórico completo',
      'Atribuição de responsáveis',
      'Status em tempo real'
    ]
  },
  {
    title: 'Gestão de Usuários',
    description: 'Controle granular de permissões e acesso ao sistema.',
    icon: Users,
    details: [
      'Perfis de acesso',
      'Hierarquia de usuários',
      'Auditoria de ações',
      'Gestão de equipes'
    ]
  },
  {
    title: 'Canal de Comunicação',
    description: 'Sistema seguro para comunicação entre denunciantes e gestores.',
    icon: MessageSquare,
    details: [
      'Chat interno',
      'Comunicação anônima',
      'Histórico de mensagens',
      'Templates de resposta'
    ]
  },
  {
    title: 'Performance Otimizada',
    description: 'Sistema rápido e eficiente para processamento de denúncias.',
    icon: Zap,
    details: [
      'Carregamento instantâneo',
      'Processamento em tempo real',
      'Otimização de recursos',
      'Alta disponibilidade'
    ]
  },
  {
    title: 'Multi-idioma',
    description: 'Suporte a múltiplos idiomas para atender organizações globais.',
    icon: Globe,
    details: [
      'Interface em português',
      'Suporte a outros idiomas',
      'Tradução automática',
      'Localização de conteúdo'
    ]
  },
  {
    title: 'Personalização',
    description: 'Adapte o sistema às necessidades específicas da sua organização.',
    icon: Settings,
    details: [
      'Temas personalizados',
      'Fluxos de trabalho customizados',
      'Campos personalizados',
      'Integrações flexíveis'
    ]
  }
];

const Features = () => {
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
            Recursos Poderosos
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Descubra como nossa plataforma oferece todas as ferramentas necessárias para uma gestão eficiente e segura de denúncias.
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail) => (
                    <li key={detail} className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      {detail}
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
              Experimente nossa plataforma e descubra como ela pode transformar sua gestão de denúncias.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Fale Conosco
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary hover:bg-primary/10 transition-colors"
              >
                Ver Preços
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features; 