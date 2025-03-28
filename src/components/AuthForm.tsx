
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Mail, Lock } from "lucide-react";

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    companyName: '',
    acceptTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        <div className="bg-primary/10 p-2 rounded-full">
          <Shield className="h-8 w-8 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-6">
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
        
        <div className="mb-6">
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
        
        {type === 'register' && (
          <div className="flex items-center space-x-2 mb-6">
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
              className="text-sm text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Concordo com os <Link to="#" className="text-primary hover:underline">Termos de Serviço</Link> e <Link to="#" className="text-primary hover:underline">Política de Privacidade</Link>
            </label>
          </div>
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
        
        <div className="text-center text-sm text-gray-500">
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
      </form>
    </div>
  );
};

export default AuthForm;
