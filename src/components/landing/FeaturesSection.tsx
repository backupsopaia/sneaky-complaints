import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MessageSquare, BarChart3, ClipboardList, Lock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Shield,
    title: 'Anonimato Garantido',
    description: 'Garantimos o anonimato dos denunciantes, promovendo um ambiente seguro para reportar irregularidades.',
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    icon: MessageSquare,
    title: 'Comunicação Bidirecional',
    description: 'Canal de comunicação bidirecional e criptografado entre gestores e denunciantes.',
    color: 'bg-purple-500/10 text-purple-500'
  },
  {
    icon: BarChart3,
    title: 'Dashboard Completo',
    description: 'Dashboard com métricas e relatórios detalhados para acompanhamento de casos e tendências.',
    color: 'bg-green-500/10 text-green-500'
  },
  {
    icon: ClipboardList,
    title: 'Gestão de Casos',
    description: 'Sistema completo para gerenciamento e acompanhamento de denúncias em todas as etapas.',
    color: 'bg-orange-500/10 text-orange-500'
  },
  {
    icon: Lock,
    title: 'Segurança Avançada',
    description: 'Criptografia de ponta a ponta e protocolos de segurança para proteção total dos dados.',
    color: 'bg-red-500/10 text-red-500'
  },
  {
    icon: Users,
    title: 'Multi-níveis de Acesso',
    description: 'Controle granular de permissões e diferentes níveis de acesso para sua equipe.',
    color: 'bg-indigo-500/10 text-indigo-500'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Recursos Exclusivos
          </span>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Tudo o que você precisa em um só lugar
          </h2>
          <p className="text-muted-foreground">
            Nossa plataforma oferece tudo o que você precisa para implementar um canal de denúncias eficaz e compliant.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={cn(
                "p-8 h-full rounded-2xl bg-background/50 backdrop-blur-sm",
                "border border-border/50 shadow-sm",
                "transition-all duration-300",
                "hover:shadow-lg hover:border-primary/20",
                "flex flex-col"
              )}>
                <div className={cn(
                  "w-12 h-12 rounded-lg mb-4",
                  "flex items-center justify-center",
                  feature.color
                )}>
                  <feature.icon size={24} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
                
                <div className={cn(
                  "absolute inset-0 rounded-2xl opacity-0",
                  "transition-opacity duration-300 pointer-events-none",
                  "bg-gradient-to-br from-primary/5 via-primary/10 to-transparent",
                  "group-hover:opacity-100"
                )} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
