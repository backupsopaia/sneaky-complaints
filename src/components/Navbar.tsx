
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="text-xl font-bold">DenuncieAqui</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {isMobile ? (
            <>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
              
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div 
                    className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <nav className="flex flex-col space-y-4">
                      <Link to="/" className="text-sm font-medium hover:text-primary touch-action" onClick={() => setIsMenuOpen(false)}>
                        Início
                      </Link>
                      <Link to="#features" className="text-sm font-medium hover:text-primary touch-action" onClick={() => setIsMenuOpen(false)}>
                        Recursos
                      </Link>
                      <Link to="#pricing" className="text-sm font-medium hover:text-primary touch-action" onClick={() => setIsMenuOpen(false)}>
                        Preços
                      </Link>
                      <Link to="/report" className="text-sm font-medium hover:text-primary touch-action" onClick={() => setIsMenuOpen(false)}>
                        Fazer Denúncia
                      </Link>
                      <div className="pt-2 flex flex-col space-y-2">
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full">Entrar</Button>
                        </Link>
                        <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                          <Button className="w-full">Registrar Empresa</Button>
                        </Link>
                      </div>
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
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
      </div>
    </header>
  );
};

export default Navbar;
