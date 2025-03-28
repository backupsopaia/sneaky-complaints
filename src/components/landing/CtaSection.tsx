
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para implementar o seu canal de denúncias?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Comece hoje mesmo, gratuitamente, e garanta mais segurança e conformidade para a sua empresa.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Criar Conta Gratuita
            </Button>
          </Link>
          <Link to="#features">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
              Saiba Mais
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
