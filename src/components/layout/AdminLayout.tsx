import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/theme/ThemeProvider';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 z-50"
      >
        {/* O Header será renderizado dentro do AdminDashboard */}
      </motion.div>

      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 