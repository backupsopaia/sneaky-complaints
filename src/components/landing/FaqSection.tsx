
import React from 'react';

const FaqSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tudo o que você precisa saber sobre nossa plataforma de denúncias.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <FaqItem 
            question="Como é garantido o anonimato dos denunciantes?" 
            answer="Nossa plataforma não armazena informações que possam identificar o denunciante, como IP, cookies ou dados pessoais, a menos que ele opte por se identificar. Toda comunicação é criptografada e o acesso às denúncias é restrito."
          />
          
          <FaqItem 
            question="Quanto tempo leva para implementar o canal de denúncias?" 
            answer="Em apenas alguns minutos! Após o cadastro, você pode personalizar seu canal com a marca da empresa e já começar a receber denúncias. A configuração completa, com políticas e formulários personalizados, pode levar algumas horas."
          />
          
          <FaqItem 
            question="O sistema está em conformidade com a LGPD?" 
            answer="Sim, nossa plataforma foi desenvolvida considerando todos os requisitos da Lei Geral de Proteção de Dados, com medidas técnicas e organizacionais que garantem a proteção dos dados pessoais processados."
          />
          
          <FaqItem 
            question="Posso integrar com os sistemas da minha empresa?" 
            answer="Sim, nos planos Empresarial oferecemos APIs para integração com sistemas internos, como HRIS, ferramentas de compliance e sistemas de ticket."
          />
        </div>
      </div>
    </section>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">
        {question}
      </h3>
      <p className="text-gray-600">
        {answer}
      </p>
    </div>
  );
};

export default FaqSection;
