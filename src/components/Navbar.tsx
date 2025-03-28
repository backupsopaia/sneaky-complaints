
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield, Menu, X, FileText, User, Home } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '@/context/content/ContentContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { content } = useContent();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Não mostrar a Navbar no dashboard
  if (location.pathname === '/dashboard') {
    return null;
  }

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
                      {content.navigation.map((item) => (
                        <Link 
                          key={item.id}
                          to={item.url} 
                          className="text-sm font-medium hover:text-primary touch-action flex items-center gap-2" 
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.url === '/' && <Home size={18} />}
                          {item.url.includes('report') && <FileText size={18} />}
                          {item.url.includes('status') && <Shield size={18} />}
                          {!item.url.includes('report') && !item.url.includes('status') && item.url !== '/' && (
                            <FileText size={18} />
                          )}
                          <span>{item.label}</span>
                        </Link>
                      ))}
                      <div className="pt-2 flex flex-col space-y-2">
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full flex items-center gap-2">
                            <User size={18} />
                            <span>Entrar</span>
                          </Button>
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
                {content.navigation.map((item) => (
                  <Link 
                    key={item.id} 
                    to={item.url} 
                    className="text-sm font-medium hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
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
