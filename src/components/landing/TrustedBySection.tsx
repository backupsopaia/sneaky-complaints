import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const companies = [
  { name: 'Empresa 1', logo: '/logos/logo1.svg' },
  { name: 'Empresa 2', logo: '/logos/logo2.svg' },
  { name: 'Empresa 3', logo: '/logos/logo3.svg' },
  { name: 'Empresa 4', logo: '/logos/logo4.svg' },
  { name: 'Empresa 5', logo: '/logos/logo5.svg' },
];

const TrustedBySection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Confiança e Credibilidade
          </span>
          <h2 className="text-2xl font-bold mb-3">
            UTILIZADO POR EMPRESAS DE TODOS OS PORTES
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Nossa plataforma oferece tudo o que você precisa para implementar um canal de denúncias eficaz e compliant.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={cn(
                "w-32 h-16 rounded-lg bg-background/80 backdrop-blur-sm",
                "border border-border/50 shadow-sm",
                "flex items-center justify-center",
                "transition-all duration-300 group-hover:scale-105",
                "group-hover:border-primary/20 group-hover:shadow-md"
              )}>
                <div className="w-20 h-8 bg-gray-200 animate-pulse rounded" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Junte-se a mais de <span className="font-semibold text-foreground">500+ empresas</span> que já confiam em nossa plataforma
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
