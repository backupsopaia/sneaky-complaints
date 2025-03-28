
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportForm from "./pages/ReportForm";
import ReportDetails from "./pages/ReportDetails";
import CheckStatus from "./pages/CheckStatus";
import NotFound from "./pages/NotFound";
import MobileNavigation from "./components/MobileNavigation";

const queryClient = new QueryClient();

// Componente de wrapper para animações de página
const AnimatedRoutes = () => {
  const location = useLocation();
  
  // Determine if bottom navigation should be shown
  // Hide it on the dashboard page as it has its own navigation
  const showBottomNav = !['/dashboard'].includes(location.pathname);
  
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className={showBottomNav ? 'has-bottom-nav' : ''}
        >
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/report/:id" element={<ReportDetails />} />
            <Route path="/check-status" element={<CheckStatus />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      
      {showBottomNav && <MobileNavigation />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
