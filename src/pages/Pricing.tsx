import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, Star, Shield, Zap, Building2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const plans = [
    {
      name: "Inicial",
      description: "Para pequenas empresas iniciando seu programa de compliance.",
      prices: {
        monthly: "0",
        quarterly: "0",
        semiannual: "0",
        annual: "0"
      },
      period: "mês",
      icon: Shield,
      features: [
        "Até 20 colaboradores",
        "Canal de denúncias básico",
        "Personalização limitada",
        "Anonimato para denunciantes",
        "Relatório mensal básico"
      ],
      cta: "Começar Grátis",
      ctaLink: "/register?plan=free",
      variant: "outline",
      popular: false
    },
    {
      name: "Profissional",
      description: "Para empresas em crescimento que precisam de mais recursos.",
      prices: {
        monthly: "20.000",
        quarterly: "54.000",
        semiannual: "96.000",
        annual: "180.000"
      },
      period: "mês",
      icon: Zap,
      features: [
        "Até 100 colaboradores",
        "Canal de denúncias personalizado",
        "Categorização de denúncias",
        "Comunicação com denunciantes",
        "Dashboard e relatórios avançados",
        "Suporte por email"
      ],
      cta: "Começar Agora",
      ctaLink: "/register?plan=pro",
      variant: "default",
      popular: true
    },
    {
      name: "Empresarial",
      description: "Para grandes organizações com necessidades avançadas.",
      prices: {
        monthly: "Personalizado",
        quarterly: "Personalizado",
        semiannual: "Personalizado",
        annual: "Personalizado"
      },
      period: "",
      icon: Building2,
      features: [
        "Colaboradores ilimitados",
        "Canal de denúncias totalmente personalizado",
        "Integrações com sistemas internos",
        "Workflow de investigação avançado",
        "Análise de dados e insights",
        "API para integração",
        "Suporte prioritário 24/7"
      ],
      cta: "Fale com Vendas",
      ctaLink: "/register?plan=enterprise",
      variant: "outline",
      popular: false
    }
  ];

  const savings = {
    quarterly: "10%",
    semiannual: "15%",
    annual: "25%"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 mt-16">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              Planos transparentes, sem surpresas
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Escolha o plano que melhor se adapta às necessidades da sua empresa, 
              com recursos essenciais de compliance e gestão de denúncias.
            </motion.p>
            
            <Tabs defaultValue="monthly" className="w-full max-w-md mx-auto" onValueChange={setBillingPeriod}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="monthly">Mensal</TabsTrigger>
                <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
                <TabsTrigger value="semiannual">Semestral</TabsTrigger>
                <TabsTrigger value="annual">Anual</TabsTrigger>
              </TabsList>
            </Tabs>

            {billingPeriod !== "monthly" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-500 mt-2 text-sm"
              >
                Economize {savings[billingPeriod as keyof typeof savings]} com pagamento {billingPeriod === "quarterly" ? "trimestral" : billingPeriod === "semiannual" ? "semestral" : "anual"}
              </motion.p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative border rounded-lg shadow-sm p-8 flex flex-col h-full
                  ${plan.popular ? 'border-primary shadow-lg' : 'border-border'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-sm font-medium py-1 px-3 rounded-full">
                    Mais Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <plan.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold">
                      {plan.prices[billingPeriod as keyof typeof plan.prices] === "Personalizado" 
                        ? "Personalizado" 
                        : `${plan.prices[billingPeriod as keyof typeof plan.prices]} Kz`}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check size={20} className="mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to={plan.ctaLink}>
                  <Button 
                    variant={plan.variant as "default" | "outline"} 
                    className="w-full group"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-muted rounded-lg p-8 max-w-3xl mx-auto"
            >
              <h3 className="text-2xl font-semibold mb-4">Ainda tem dúvidas?</h3>
              <p className="text-muted-foreground mb-6">
                Entre em contato com nossa equipe de vendas para discutir suas necessidades específicas
                e encontrar a melhor solução para sua empresa.
              </p>
              <Link to="/contact">
                <Button variant="outline" className="group">
                  Fale com nossa equipe
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing; 