import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Diretora de Compliance',
    company: 'Banco Nacional',
    image: '/testimonials/avatar1.jpg',
    content: 'O sistema de denúncias da SneakyComplaints revolucionou a forma como gerenciamos as denúncias internas. A facilidade de uso e a segurança oferecida são impressionantes.',
    rating: 5
  },
  {
    name: 'João Santos',
    role: 'Gerente de RH',
    company: 'Tech Solutions',
    image: '/testimonials/avatar2.jpg',
    content: 'Implementamos o sistema há 6 meses e já vimos uma melhoria significativa na confiança dos funcionários em reportar questões importantes.',
    rating: 5
  },
  {
    name: 'Ana Oliveira',
    role: 'Coordenadora de Ética',
    company: 'Instituto Educacional',
    image: '/testimonials/avatar3.jpg',
    content: 'A plataforma é intuitiva e segura. O suporte técnico é excelente e sempre nos ajudam quando precisamos.',
    rating: 5
  },
  {
    name: 'Pedro Costa',
    role: 'Diretor de Operações',
    company: 'Consultoria Global',
    image: '/testimonials/avatar4.jpg',
    content: 'O sistema nos ajudou a manter a conformidade com as regulamentações e melhorou significativamente nossa gestão de riscos.',
    rating: 5
  }
];

const Testimonials = () => {
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
            O que nossos clientes dizem
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Descubra como organizações de diferentes setores estão transformando sua gestão de denúncias com nossa plataforma.
          </motion.p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} na {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary opacity-20" />
                  <p className="text-muted-foreground italic pl-4">
                    "{testimonial.content}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">98%</h3>
              <p className="text-muted-foreground">Satisfação dos clientes</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">500+</h3>
              <p className="text-muted-foreground">Organizações atendidas</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-4xl font-bold text-primary mb-2">24/7</h3>
              <p className="text-muted-foreground">Suporte disponível</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-4">Pronto para transformar sua gestão de denúncias?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a centenas de organizações que já confiam em nossa plataforma.
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

export default Testimonials; 