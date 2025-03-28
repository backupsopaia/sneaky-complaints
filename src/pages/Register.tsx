
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/auth/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { register } = useAuth();
  
  // Get the plan from URL query params if available
  const searchParams = new URLSearchParams(location.search);
  const plan = searchParams.get('plan');

  const handleRegister = async (data: any) => {
    if (!data.acceptTerms) {
      toast({
        variant: "destructive",
        title: "Termos não aceitos",
        description: "Você precisa aceitar os termos de serviço para continuar.",
      });
      return;
    }

    try {
      await register(data.email, data.password, data.companyName);
      toast({
        title: "Registro concluído",
        description: "Sua conta foi criada com sucesso.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha no registro",
        description: "Não foi possível criar sua conta. Tente novamente.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full">
          {plan && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-blue-800 font-medium">
                Você escolheu o plano {plan === 'free' ? 'Gratuito' : plan === 'pro' ? 'Profissional' : 'Empresarial'}
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Você poderá alterar seu plano a qualquer momento após o registro.
              </p>
            </div>
          )}
          
          <AuthForm type="register" onSubmit={handleRegister} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
