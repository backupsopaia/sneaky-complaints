import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, Trash2, Info } from 'lucide-react';

const sections = [
  {
    title: '1. O que são Cookies?',
    content: `Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo quando você visita nosso site. Eles nos ajudam a melhorar sua experiência e fornecer funcionalidades personalizadas.`,
    icon: Cookie
  },
  {
    title: '2. Tipos de Cookies que Utilizamos',
    content: `Utilizamos diferentes tipos de cookies:
    • Cookies Essenciais: Necessários para o funcionamento básico do site
    • Cookies de Funcionalidade: Permitem funcionalidades personalizadas
    • Cookies de Desempenho: Ajudam a melhorar a velocidade e eficiência
    • Cookies de Marketing: Usados para análise e publicidade`,
    icon: Info
  },
  {
    title: '3. Como Usamos os Cookies',
    content: `Utilizamos cookies para:
    • Manter você conectado
    • Lembrar suas preferências
    • Melhorar a segurança
    • Analisar o uso do site
    • Personalizar sua experiência`,
    icon: Settings
  },
  {
    title: '4. Segurança dos Cookies',
    content: `Implementamos medidas de segurança para proteger os cookies e seus dados. Todos os cookies são transmitidos de forma segura e criptografada.`,
    icon: Shield
  },
  {
    title: '5. Controle de Cookies',
    content: `Você pode controlar e gerenciar os cookies através das configurações do seu navegador. Você pode:
    • Aceitar ou recusar cookies
    • Excluir cookies existentes
    • Configurar preferências específicas`,
    icon: Trash2
  },
  {
    title: '6. Atualizações da Política',
    content: `Podemos atualizar esta política periodicamente para refletir mudanças em nossas práticas de uso de cookies. Recomendamos verificar regularmente esta página.`
  },
  {
    title: '7. Contato',
    content: `Para questões sobre nossa política de cookies, entre em contato através do email: privacy@sneakycomplaints.co.ao`
  }
];

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-6"
          >
            <Cookie className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Política de Cookies</h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Última atualização: {new Date().toLocaleDateString('pt-AO')}
          </motion.p>
        </div>
      </section>

      {/* Cookies Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-8">
                Esta política de cookies explica como o SneakyComplaints utiliza cookies e tecnologias similares para melhorar sua experiência em nosso site.
              </p>
              
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-8"
                >
                  <div className="flex items-start mb-4">
                    {section.icon && (
                      <section.icon className="h-6 w-6 text-primary mr-3 mt-1" />
                    )}
                    <h2 className="text-2xl font-semibold">{section.title}</h2>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-3xl font-bold mb-4">Precisa de mais informações?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Nossa equipe está pronta para esclarecer suas dúvidas sobre nossa política de cookies.
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

export default Cookies; 