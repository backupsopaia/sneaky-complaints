
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Shield, User } from "lucide-react";
import { motion } from "framer-motion";

const MobileNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: FileText, label: "Denunciar", path: "/report" },
    { icon: Shield, label: "Status", path: "/check-status" },
    { icon: User, label: "Conta", path: "/login" }
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <motion.div
                className={`flex flex-col items-center justify-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MobileNavigation;
