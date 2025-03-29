import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Eye, FileText, Mail, Trash2, Globe, UserCheck, AlertCircle } from 'lucide-react';

const sections = [
  {
    title: '1. Introdução',
    content: `O SneakyComplaints está comprometido com a proteção dos seus dados pessoais. Esta política descreve como implementamos medidas de segurança e conformidade com a Lei de Proteção de Dados de Angola.`,
    icon: Shield
  },
  {
    title: '2. Base Legal',
    content: `Nossa política de proteção de dados está alinhada com:
    • Lei de Proteção de Dados de Angola
    • Regulamento Geral de Proteção de Dados (RGPD)
    • Padrões internacionais de segurança`,
    icon: FileText
  },
  {
    title: '3. Medidas de Segurança',
    content: `Implementamos várias camadas de segurança:
    • Criptografia de ponta a ponta
    • Firewalls e proteção contra ameaças
    • Monitoramento contínuo de segurança
    • Backups regulares
    • Controle de acesso rigoroso`,
    icon: Lock
  },
  {
    title: '4. Processamento de Dados',
    content: `Processamos seus dados de forma:
    • Lícita e transparente
    • Limitada aos fins específicos
    • Minimizada ao necessário
    • Precisa e atualizada
    • Armazenada de forma segura`,
    icon: Database
  },
  {
    title: '5. Seus Direitos',
    content: `Você tem direito a:
    • Acessar seus dados
    • Corrigir informações incorretas
    • Solicitar exclusão
    • Limitar o processamento
    • Portabilidade dos dados
    • Oposição ao processamento`,
    icon: UserCheck
  },
  {
    title: '6. Transferência de Dados',
    content: `Quando necessário transferir dados:
    • Garantimos proteção adequada
    • Utilizamos mecanismos de segurança
    • Cumprimos requisitos legais
    • Mantemos registros de transferências`,
    icon: Globe
  },
  {
    title: '7. Violações de Dados',
    content: `Em caso de violação:
    • Notificamos autoridades competentes
    • Informamos afetados quando necessário
    • Implementamos medidas corretivas
    • Prevenimos futuras ocorrências`,
    icon: AlertCircle
  },
  {
    title: '8. Retenção de Dados',
    content: `Mantemos seus dados apenas pelo tempo necessário para:
    • Cumprir finalidades legítimas
    • Atender requisitos legais
    • Resolver disputas
    • Manter registros contábeis`,
    icon: Trash2
  },
  {
    title: '9. Atualizações da Política',
    content: `Esta política pode ser atualizada para refletir:
    • Mudanças na legislação
    • Novas práticas de segurança
    • Alterações em nossos serviços`
  },
  {
    title: '10. Contato',
    content: `Para questões sobre proteção de dados, entre em contato com nosso DPO:
    Email: dpo@sneakycomplaints.co.ao
    Telefone: +244 923 456 789
    Endereço: Rua Amílcar Cabral, 123, Luanda, Angola`
  }
];

const DataProtection = () => {
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
            <h1 className="text-4xl font-bold">Proteção de Dados</h1>
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

      {/* Data Protection Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-8">
                A proteção dos seus dados é nossa prioridade. Esta política detalha como implementamos medidas de segurança e conformidade com a legislação de proteção de dados.
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
              Nossa equipe de proteção de dados está pronta para esclarecer suas dúvidas sobre o tratamento de seus dados.
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

export default DataProtection; 