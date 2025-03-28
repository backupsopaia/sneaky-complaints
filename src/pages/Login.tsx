
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/auth/useAuth';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Building, Info, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
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
      
      try {
        await login(data.email, data.password, undefined, loginType === 'admin');
        completeLogin();
      } catch (error: any) {
        if (error.message === "Autenticação de dois fatores necessária") {
          setShowTwoFactor(true);
        } else {
          throw error;
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falha no login",
        description: "Email ou senha incorretos. Tente novamente.",
      });
    }
  };
  
  const handleTwoFactorSubmit = async () => {
    try {
      await login(loginData.email, loginData.password, twoFactorCode, loginData.isSuperAdmin);
      completeLogin();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Código inválido",
        description: "O código de autenticação é inválido. Tente novamente.",
      });
    }
  };
  
  const completeLogin = () => {
    setShowTwoFactor(false);
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
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setTwoFactorCode(randomCode);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <Tabs defaultValue="company" onValueChange={(value) => setLoginType(value as 'company' | 'admin')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Empresa
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Administração Central
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="company">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Login - Portal da Empresa</h2>
                
                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Credenciais provisórias:</strong> 
                    <button 
                      onClick={fillCompanyCredentials}
                      className="ml-2 text-primary underline text-sm"
                    >
                      Preencher automaticamente
                    </button>
                    <div className="mt-1 text-sm">
                      Email: empresa@example.com<br />
                      Senha: Senha@123
                    </div>
                  </AlertDescription>
                </Alert>
                
                <div id="company-login-form">
                  <AuthForm type="login" onSubmit={handleLogin} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="admin">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Login - Administração Central</h2>
                
                <Alert className="mb-4">
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Credenciais Super Admin:</strong>
                    <button 
                      onClick={fillAdminCredentials}
                      className="ml-2 text-primary underline text-sm"
                    >
                      Preencher automaticamente
                    </button>
                    <div className="mt-1 text-sm">
                      Email: admin@denuncieaqui.com<br />
                      Senha: admin123
                    </div>
                  </AlertDescription>
                </Alert>
                
                <p className="text-sm text-gray-500 mb-4 text-center">
                  Acesso restrito para administradores da plataforma.
                </p>
                
                <div id="admin-login-form">
                  <AuthForm type="login" onSubmit={handleLogin} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <Dialog open={showTwoFactor} onOpenChange={setShowTwoFactor}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Autenticação de Dois Fatores
              </DialogTitle>
              <DialogDescription>
                Digite o código de 6 dígitos do seu aplicativo autenticador.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <AlertTriangle className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                  <strong>Demonstração:</strong> Qualquer código de 6 dígitos será aceito.
                </AlertDescription>
              </Alert>
              
              <InputOTP maxLength={6} value={twoFactorCode} onChange={setTwoFactorCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              
              <div className="flex w-full gap-2 mt-2">
                <Button 
                  variant="outline" 
                  onClick={generateRandomCode}
                  className="flex-1"
                >
                  Gerar código aleatório
                </Button>
                
                <Button 
                  onClick={handleTwoFactorSubmit}
                  disabled={twoFactorCode.length !== 6}
                  className="flex-1"
                >
                  Verificar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Login;
