import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Shield,
  UserCheck,
  LineChart,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Anonimato Garantido',
    description: 'Sua identidade é protegida em todas as etapas do processo.'
  },
  {
    icon: UserCheck,
    title: 'Fácil de Usar',
    description: 'Interface intuitiva que permite fazer denúncias em poucos passos.'
  },
  {
    icon: LineChart,
    title: 'Acompanhamento Detalhado',
    description: 'Monitore o status e progresso de suas denúncias em tempo real.'
  },
  {
    icon: Clock,
    title: 'Resposta Rápida',
    description: 'Nossa equipe analisa e processa as denúncias com agilidade.'
  },
  {
    icon: CheckCircle,
    title: 'Alta Taxa de Resolução',
    description: 'Mais de 90% das denúncias são resolvidas com sucesso.'
  }
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Slider */}
      <HeroSlider />

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight mb-4"
            >
              Por que escolher nossa plataforma?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground"
            >
              Oferecemos uma solução completa e segura para você fazer suas denúncias
              de forma anônima e acompanhar todo o processo.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <Button size="lg" className="group">
              Comece Agora
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
