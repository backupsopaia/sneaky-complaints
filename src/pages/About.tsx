import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Target, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Empresas Atendidas', value: '500+' },
    { label: 'Denúncias Processadas', value: '10.000+' },
    { label: 'Taxa de Satisfação', value: '98%' },
    { label: 'Países Atendidos', value: '5' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Segurança e Privacidade',
      description: 'Garantimos a proteção total dos dados e o anonimato dos denunciantes.'
    },
    {
      icon: Users,
      title: 'Compromisso com o Cliente',
      description: 'Oferecemos suporte dedicado e personalizado para cada empresa.'
    },
    {
      icon: Target,
      title: 'Eficiência e Precisão',
      description: 'Nossa plataforma é otimizada para processar denúncias de forma rápida e precisa.'
    },
    {
      icon: Award,
      title: 'Excelência em Serviço',
      description: 'Buscamos constantemente a excelência em tudo que fazemos.'
    }
  ];

  return (
    <div className="min-h-screen bg-white/50 backdrop-blur-lg dark:bg-transparent">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a DenuncieAqui
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
              Transformando a gestão de denúncias empresariais com tecnologia e inovação
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/30 dark:bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-500 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">
                A DenuncieAqui nasceu com o propósito de transformar a forma como as empresas lidam com denúncias internas. 
                Nossa missão é fornecer uma plataforma segura, eficiente e confiável que promova a transparência e a integridade 
                nas organizações.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Acreditamos que um ambiente de trabalho saudável e ético é fundamental para o sucesso de qualquer empresa. 
                Nossa plataforma facilita a comunicação de problemas e irregularidades, permitindo que as organizações 
                identifiquem e resolvam questões antes que se tornem problemas maiores.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-white/30 dark:bg-gray-900/30 rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white/30 dark:bg-gray-900/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Nossos Valores</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Os princípios que guiam nossa empresa e definem como trabalhamos
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-white/50 dark:bg-gray-900/50"
              >
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Pronto para Transformar sua Gestão de Denúncias?</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que já confiam na DenuncieAqui para gerenciar suas denúncias de forma segura e eficiente.
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Começar Agora
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 