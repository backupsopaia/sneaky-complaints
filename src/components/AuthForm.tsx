
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Mail, Lock, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    companyName: '',
    acceptTerms: false,
    gdprConsent: false
  });
  
  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = React.useState({
    score: 0,
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Check password strength if password field is changed
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };
  
  const checkPasswordStrength = (password: string) => {
    let score = 0;
    let message = '';
    
    if (password.length > 7) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^A-Za-z0-9]/)) score++;
    
    switch (score) {
      case 0:
      case 1:
        message = 'Muito fraca';
        break;
      case 2:
        message = 'Fraca';
        break;
      case 3:
        message = 'Média';
        break;
      case 4:
        message = 'Forte';
        break;
      case 5:
        message = 'Muito forte';
        break;
    }
    
    setPasswordStrength({ score, message });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  // Color for password strength indicator
  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-500';
      case 5:
        return 'bg-emerald-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
          <Shield className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
        {type === 'login' ? 'Entre na sua conta' : 'Registre sua empresa'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <div className="mb-4">
            <Label htmlFor="companyName">Nome da Empresa</Label>
            <div className="relative">
              <Input
                id="companyName"
                name="companyName"
                placeholder="Sua Empresa Ltda."
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Shield size={16} />
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seunome@empresa.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={16} />
            </div>
          </div>
        </div>
        
        <div className="mb-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={16} />
            </div>
          </div>
        </div>
        
        {/* Password strength indicator */}
        {type === 'register' && formData.password && (
          <div className="mb-4">
            <div className="w-full h-1 bg-gray-200 rounded-full mt-1 mb-1">
              <div 
                className={`h-1 rounded-full ${getPasswordStrengthColor()}`} 
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 flex justify-between">
              <span>Força da senha: {passwordStrength.message}</span>
              <span>{formData.password.length} caracteres</span>
            </p>
          </div>
        )}
        
        {type === 'register' && (
          <>
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="acceptTerms" 
                name="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData({...formData, acceptTerms: checked as boolean})
                }
                required
              />
              <label
                htmlFor="acceptTerms"
                className="text-sm text-gray-600 dark:text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Concordo com os <Link to="#" className="text-primary hover:underline">Termos de Serviço</Link> e <Link to="#" className="text-primary hover:underline">Política de Privacidade</Link>
              </label>
            </div>
            
            <div className="flex items-start space-x-2 mb-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <Checkbox 
                id="gdprConsent" 
                name="gdprConsent"
                checked={formData.gdprConsent}
                onCheckedChange={(checked) => 
                  setFormData({...formData, gdprConsent: checked as boolean})
                }
                required
              />
              <div>
                <label
                  htmlFor="gdprConsent"
                  className="text-sm text-gray-600 dark:text-gray-300 font-medium flex items-center"
                >
                  Consentimento LGPD/GDPR
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={14} className="ml-1 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80 text-xs">
                          De acordo com a Lei Geral de Proteção de Dados (LGPD) e o Regulamento Geral de Proteção de Dados (GDPR), 
                          precisamos do seu consentimento para coletar e processar seus dados pessoais.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-1">
                  Concordo com a coleta e processamento dos meus dados pessoais conforme descrito na Política de Privacidade. 
                  Entendo que posso retirar meu consentimento a qualquer momento.
                </p>
              </div>
            </div>
          </>
        )}
        
        {type === 'login' && (
          <div className="flex justify-end mb-6">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Esqueceu sua senha?
            </Link>
          </div>
        )}
        
        <Button type="submit" className="w-full mb-4">
          {type === 'login' ? 'Entrar' : 'Registrar'}
        </Button>
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          {type === 'login' ? (
            <>
              Não tem uma conta?{' '}
              <Link to="/register" className="text-primary hover:underline">
                Registre-se
              </Link>
            </>
          ) : (
            <>
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </>
          )}
        </div>
        
        {/* Security badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            <Shield size={12} className="text-green-600" />
            Conexão segura com criptografia TLS
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
