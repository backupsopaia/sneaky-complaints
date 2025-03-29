import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você implementaria a lógica de envio do formulário
    console.log('Form data:', formData);
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    
    // Limpar o formulário
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white/50 backdrop-blur-lg dark:bg-transparent">
      <main className="flex-grow">
        <div className="py-12">
          <div className="container px-4 mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Entre em Contato</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Tem alguma dúvida ou sugestão? Estamos aqui para ajudar. Preencha o formulário abaixo ou use nossos canais de contato direto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Informações de Contato */}
              <div className="space-y-6">
                <div className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg shadow-md backdrop-blur-lg">
                  <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Informações de Contato</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Email</h3>
                        <p className="text-gray-600 dark:text-gray-400">contato@sneakycomplaints.co.ao</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Telefone</h3>
                        <p className="text-gray-600 dark:text-gray-400">+244 923 456 789</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">Endereço</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Rua Amílcar Cabral, 123<br />
                          Luanda, Angola
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg shadow-md backdrop-blur-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Horário de Atendimento</h2>
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <p>Segunda a Sexta: 8h às 17h</p>
                    <p>Sábado: 8h às 12h</p>
                    <p>Domingo: Fechado</p>
                  </div>
                </div>
              </div>

              {/* Formulário de Contato */}
              <div className="bg-white/50 dark:bg-gray-900/50 p-6 rounded-lg shadow-md backdrop-blur-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">Assunto</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Mensagem</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[150px] bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact; 