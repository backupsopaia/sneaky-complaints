
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Building, Info } from "lucide-react";
import AuthForm from '@/components/AuthForm';

interface LoginTabsProps {
  loginType: 'company' | 'admin';
  setLoginType: (type: 'company' | 'admin') => void;
  handleLogin: (data: any) => Promise<void>;
  fillCompanyCredentials: () => void;
  fillAdminCredentials: () => void;
}

const LoginTabs: React.FC<LoginTabsProps> = ({
  loginType,
  setLoginType,
  handleLogin,
  fillCompanyCredentials,
  fillAdminCredentials
}) => {
  return (
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
  );
};

export default LoginTabs;
