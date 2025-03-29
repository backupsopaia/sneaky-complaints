
import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    content: "Implementar o canal de denúncias da SneakyComplaints foi uma das melhores decisões que tomamos. Conseguimos identificar problemas internos que não sabíamos que existiam e resolver rapidamente.",
    author: "Maria Silva",
    position: "Diretora de Compliance",
    company: "TechSolutions Brasil",
  },
  {
    id: 2,
    content: "A facilidade de implementação e o suporte oferecido pela equipe da SneakyComplaints superou todas as nossas expectativas. Nossos colaboradores se sentem mais seguros sabendo que têm um canal anônimo para reportar problemas.",
    author: "João Oliveira",
    position: "CEO",
    company: "Construtura Horizonte",
  },
  {
    id: 3,
    content: "O painel administrativo é extremamente intuitivo e nos fornece dados valiosos para melhorar continuamente nossa cultura organizacional. Recomendo fortemente para empresas de todos os tamanhos.",
    author: "Ana Paula Ferreira",
    position: "Gerente de RH",
    company: "Grupo Saúde & Bem-estar",
  }
];

const TestimonialsSection = () => {
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
            Depoimentos
          </span>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            O que nossos clientes estão dizendo
          </h2>
          <p className="text-muted-foreground">
            Empresas de diversos setores já confiam em nossa plataforma para garantir um ambiente de trabalho mais seguro e transparente
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={cn(
                "p-8 h-full rounded-2xl",
                "bg-gradient-to-br from-background via-background/95 to-background/90",
                "backdrop-blur-sm border border-border/50",
                "transition-all duration-300",
                "hover:shadow-lg hover:border-primary/20",
              )}>
                <Quote className="text-primary/40 w-10 h-10 mb-4" />
                
                <p className="text-foreground italic mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="mt-auto">
                  <h4 className="font-semibold">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>

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
      </div>
    </section>
  );
};

export default TestimonialsSection;
