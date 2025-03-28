
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 relative bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Canal de denúncias seguro e eficiente para sua empresa
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Implemente um canal de denúncias em minutos, 
              garantindo compliance, anonimato e gestão eficiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Começar Gratuitamente
                </Button>
              </Link>
              <Link to="/report">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Fazer Denúncia
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-md">
              <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-medium py-1 px-2 rounded-full">
                Anônimo
              </div>
              <h3 className="text-lg font-semibold mb-4">Nova Denúncia</h3>
              <div className="space-y-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    "Gostaria de reportar uma situação de assédio moral que presenciei no departamento de vendas..."
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-md">
                  <p className="text-sm">
                    "Obrigado por sua denúncia. Ela foi registrada com o protocolo #4872 e será investigada..."
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Lock size={14} />
                <span>Comunicação segura e criptografada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
