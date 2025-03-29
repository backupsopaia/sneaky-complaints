import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const infoCards = [
  {
    icon: Shield,
    title: 'Privacidade e Segurança',
    description: 'Nossa plataforma não armazena informações que possam identificar o denunciante, como IP, cookies ou dados pessoais, a menos que ele opte por se identificar. Toda comunicação é criptografada e o acesso às denúncias é restrito.',
    color: 'bg-blue-500/10 text-blue-500',
    delay: 0.1
  },
  {
    icon: Clock,
    title: 'Rápida Implementação',
    description: 'Em apenas alguns minutos! Após o cadastro, você pode personalizar seu canal com a marca da empresa e já começar a receber denúncias. A configuração completa, com políticas e formulários personalizados, pode levar algumas horas.',
    color: 'bg-green-500/10 text-green-500',
    delay: 0.2
  },
  {
    icon: Settings,
    title: 'Configuração Flexível',
    description: 'Configure seu canal de acordo com suas necessidades. Personalize formulários, defina fluxos de aprovação, estabeleça políticas e muito mais. Nossa equipe está disponível para ajudar em todo o processo.',
    color: 'bg-purple-500/10 text-purple-500',
    delay: 0.3
  }
];

const FaqSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Informações Importantes
          </span>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Tudo o que você precisa saber sobre nossa plataforma de denúncias
          </h2>
          <p className="text-muted-foreground">
            Conheça os principais aspectos da nossa solução e como ela pode ajudar sua empresa
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {infoCards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay }}
              className="relative group"
            >
              <div className={cn(
                "p-8 h-full rounded-2xl",
                "bg-gradient-to-br from-background via-background/95 to-background/90",
                "backdrop-blur-sm border border-border/50",
                "transition-all duration-300",
                "hover:shadow-lg hover:border-primary/20",
              )}>
                <div className={cn(
                  "w-12 h-12 rounded-lg mb-6",
                  "flex items-center justify-center",
                  card.color
                )}>
                  <card.icon size={24} />
                </div>

                <h3 className="text-xl font-semibold mb-4">
                  {card.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>

                <div className={cn(
                  "absolute inset-0 rounded-2xl opacity-0",
                  "bg-gradient-to-br from-primary/5 via-primary/3 to-transparent",
                  "transition-opacity duration-300 pointer-events-none",
                  "group-hover:opacity-100"
                )} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            Ainda tem dúvidas? <a href="/contato" className="text-primary hover:underline">Entre em contato</a> com nossa equipe
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
