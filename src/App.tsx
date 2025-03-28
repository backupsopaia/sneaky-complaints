import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthContext";
import { ContentProvider } from "./context/content";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "./hooks/use-mobile";
import { useEffect } from "react";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const showFooter = !isMobile && !['/dashboard', '/login', '/admin-dashboard', '/content-management'].includes(location.pathname);
  
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className={!['/login', '/dashboard', '/admin-dashboard', '/content-management'].includes(location.pathname) ? 'has-bottom-nav pb-16 md:pb-0' : ''}
        >
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/content-management" element={<ContentManagement />} />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/report/:id" element={<ReportDetails />} />
            <Route path="/check-status" element={<CheckStatus />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {showFooter && <Footer />}
        </motion.div>
      </AnimatePresence>
      
      <MobileNavigation />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ContentProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </ContentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
