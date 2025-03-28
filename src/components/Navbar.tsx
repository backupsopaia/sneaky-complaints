
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">DenuncieAqui</span>
        </Link>
        
        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
            
            {isMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg">
                <nav className="flex flex-col space-y-4">
                  <Link to="/" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Início
                  </Link>
                  <Link to="#features" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Recursos
                  </Link>
                  <Link to="#pricing" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Preços
                  </Link>
                  <Link to="/report" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                    Fazer Denúncia
                  </Link>
                  <div className="pt-2 flex flex-col space-y-2">
                    <Link to="/login">
                      <Button variant="outline" className="w-full">Entrar</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full">Registrar Empresa</Button>
                    </Link>
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="hidden md:flex gap-6">
              <Link to="/" className="text-sm font-medium hover:text-primary">
                Início
              </Link>
              <Link to="#features" className="text-sm font-medium hover:text-primary">
                Recursos
              </Link>
              <Link to="#pricing" className="text-sm font-medium hover:text-primary">
                Preços
              </Link>
              <Link to="/report" className="text-sm font-medium hover:text-primary">
                Fazer Denúncia
              </Link>
            </nav>
            <div className="hidden md:flex gap-2">
              <Link to="/login">
                <Button variant="outline">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button>Registrar Empresa</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
