import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Eye, FileText, Mail, Trash2, Globe } from 'lucide-react';

const sections = [
  {
    title: '1. Introdução',
    content: `O SneakyComplaints está comprometido em proteger sua privacidade. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais.`,
    icon: Shield
  },
  {
    title: '2. Coleta de Dados',
    content: `Coletamos apenas as informações necessárias para fornecer nossos serviços, incluindo dados de denúncias, informações de contato e dados de uso do sistema.`,
    icon: Database
  },
  {
    title: '3. Uso das Informações',
    content: `Utilizamos suas informações para processar denúncias, melhorar nossos serviços, manter a segurança e cumprir obrigações legais.`,
    icon: Eye
  },
  {
    title: '4. Proteção de Dados',
    content: `Implementamos medidas de segurança robustas, incluindo criptografia de ponta a ponta, para proteger suas informações contra acesso não autorizado.`,
    icon: Lock
  },
  {
    title: '5. Compartilhamento de Dados',
    content: `Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para o funcionamento do serviço ou exigido por lei.`,
    icon: Globe
  },
  {
    title: '6. Seus Direitos',
    content: `Você tem direito a acessar, corrigir ou solicitar a exclusão de suas informações pessoais. Entre em contato conosco para exercer esses direitos.`,
    icon: Trash2
  },
  {
    title: '7. Cookies e Tecnologias',
    content: `Utilizamos cookies e tecnologias similares para melhorar sua experiência e coletar dados de uso. Você pode controlar essas preferências nas configurações do navegador.`,
    icon: FileText
  },
  {
    title: '8. Comunicações',
    content: `Podemos enviar comunicações importantes sobre sua conta ou denúncias. Você pode optar por não receber comunicações de marketing.`,
    icon: Mail
  },
  {
    title: '9. Conformidade Legal',
    content: `Nossa política de privacidade está em conformidade com a Lei de Proteção de Dados de Angola e outras regulamentações aplicáveis.`
  },
  {
    title: '10. Alterações na Política',
    content: `Podemos atualizar esta política periodicamente. Notificaremos você sobre alterações significativas através do site ou por email.`
  },
  {
    title: '11. Contato',
    content: `Para questões sobre privacidade, entre em contato com nosso DPO (Data Protection Officer) através do email: privacy@sneakycomplaints.co.ao`
  }
];

const Privacy = () => {
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
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Política de Privacidade</h1>
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

      {/* Privacy Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-8">
                A privacidade e a segurança dos seus dados são nossas prioridades. Esta política detalha como tratamos suas informações pessoais.
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
                  <p className="text-muted-foreground">{section.content}</p>
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
              Nossa equipe de privacidade está pronta para responder suas dúvidas sobre o tratamento de seus dados.
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

export default Privacy; 