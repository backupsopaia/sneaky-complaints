import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';

const sections = [
  {
    title: '1. Aceitação dos Termos',
    content: `Ao acessar e usar o SneakyComplaints, você concorda em cumprir estes termos de serviço. Se você não concordar com qualquer parte destes termos, não poderá usar nosso serviço.`
  },
  {
    title: '2. Descrição do Serviço',
    content: `O SneakyComplaints é uma plataforma de gestão de denúncias que permite às organizações implementar e gerenciar canais de denúncias de forma segura e eficiente.`
  },
  {
    title: '3. Uso do Serviço',
    content: `Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos. Você não deve usar o serviço para qualquer finalidade ilegal ou não autorizada.`
  },
  {
    title: '4. Privacidade e Segurança',
    content: `Nos comprometemos a proteger sua privacidade e a segurança dos dados. Nossa política de privacidade descreve como coletamos, usamos e protegemos suas informações.`
  },
  {
    title: '5. Responsabilidades do Usuário',
    content: `Você é responsável por manter a confidencialidade de sua conta e senha. Você deve notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.`
  },
  {
    title: '6. Propriedade Intelectual',
    content: `Todo o conteúdo, funcionalidades e tecnologia do SneakyComplaints são de propriedade exclusiva da nossa empresa e estão protegidos por leis de propriedade intelectual.`
  },
  {
    title: '7. Limitação de Responsabilidade',
    content: `O SneakyComplaints não será responsável por danos indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar o serviço.`
  },
  {
    title: '8. Modificações dos Termos',
    content: `Reservamos o direito de modificar estes termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação dos termos atualizados.`
  },
  {
    title: '9. Rescisão',
    content: `Podemos encerrar ou suspender seu acesso ao serviço imediatamente, sem aviso prévio, por qualquer violação destes termos.`
  },
  {
    title: '10. Lei Aplicável',
    content: `Estes termos são regidos pelas leis de Angola. Qualquer disputa será submetida à jurisdição exclusiva dos tribunais de Angola.`
  },
  {
    title: '11. Contato',
    content: `Para questões sobre estes termos, entre em contato conosco através do email: legal@sneakycomplaints.co.ao`
  }
];

const Terms = () => {
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
            <ScrollText className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold">Termos de Serviço</h1>
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

      {/* Terms Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-8">
                Bem-vindo ao SneakyComplaints. Ao usar nossa plataforma, você concorda com os seguintes termos e condições.
              </p>
              
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
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
            <h2 className="text-3xl font-bold mb-4">Ainda tem dúvidas?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Nossa equipe jurídica está pronta para esclarecer suas dúvidas sobre nossos termos de serviço.
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

export default Terms; 