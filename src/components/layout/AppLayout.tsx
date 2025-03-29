import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';
import { useTheme } from '@/context/theme/ThemeProvider';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 z-50"
      >
        <Header />
      </motion.div>

      <AnimatePresence mode="wait">
        <main className="flex-grow pt-16">
          {children}
        </main>
      </AnimatePresence>

      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-background border-t border-border"
      >
        <Footer />
      </motion.footer>
    </div>
  );
};

export default AppLayout;
