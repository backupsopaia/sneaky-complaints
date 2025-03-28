import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/auth/useAuth';
import TwoFactorModal from '@/components/auth/TwoFactorModal';
import LoginTabs from '@/components/auth/LoginTabs';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState<{email: string, password: string, isSuperAdmin?: boolean}>({ 
    email: "", 
    password: "",
    isSuperAdmin: false
  });
  const [loginType, setLoginType] = useState<'company' | 'admin'>('company');

  const handleLogin = async (data: any) => {
    try {
      setLoginData({ 
        email: data.email, 
        password: data.password,
        isSuperAdmin: loginType === 'admin'
      });
      
      await login(data.email, data.password, "123456", loginType === 'admin');
      completeLogin();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha no login",
        description: "Email ou senha incorretos. Tente novamente.",
      });
    }
  };
  
  const completeLogin = () => {
    toast({
      title: "Login bem-sucedido",
      description: "Você foi autenticado com sucesso.",
    });
    
    if (loginType === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const fillCompanyCredentials = () => {
    const demoForm = document.getElementById('company-login-form');
    if (demoForm) {
      const emailInput = demoForm.querySelector('input[name="email"]') as HTMLInputElement;
      const passwordInput = demoForm.querySelector('input[name="password"]') as HTMLInputElement;
      
      if (emailInput && passwordInput) {
        emailInput.value = 'empresa@example.com';
        passwordInput.value = 'Senha@123';
        
        const event = new Event('change', { bubbles: true });
        emailInput.dispatchEvent(event);
        passwordInput.dispatchEvent(event);
      }
    }
  };

  const fillAdminCredentials = () => {
    const adminForm = document.getElementById('admin-login-form');
    if (adminForm) {
      const emailInput = adminForm.querySelector('input[name="email"]') as HTMLInputElement;
      const passwordInput = adminForm.querySelector('input[name="password"]') as HTMLInputElement;
      
      if (emailInput && passwordInput) {
        emailInput.value = 'admin@denuncieaqui.com';
        passwordInput.value = 'admin123';
        
        const event = new Event('change', { bubbles: true });
        emailInput.dispatchEvent(event);
        passwordInput.dispatchEvent(event);
      }
    }
  };

  const generateRandomCode = () => {
    return "123456";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <LoginTabs 
            loginType={loginType}
            setLoginType={setLoginType}
            handleLogin={handleLogin}
            fillCompanyCredentials={fillCompanyCredentials}
            fillAdminCredentials={fillAdminCredentials}
          />
        </div>
        
        <TwoFactorModal 
          showTwoFactor={false}
          setShowTwoFactor={setShowTwoFactor}
          twoFactorCode={twoFactorCode}
          setTwoFactorCode={setTwoFactorCode}
          handleTwoFactorSubmit={handleTwoFactorSubmit}
          generateRandomCode={generateRandomCode}
        />
      </div>
    </div>
  );
};

export default Login;
