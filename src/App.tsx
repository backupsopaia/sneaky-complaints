import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from '@/context/theme/useTheme';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import EnterpriseAdminDashboard from '@/pages/EnterpriseAdminDashboard';
import ContentManagement from '@/pages/ContentManagement';
import ReportForm from '@/pages/ReportForm';
import ReportDetails from '@/pages/ReportDetails';
import CheckStatus from '@/pages/CheckStatus';
import NotFound from '@/pages/NotFound';

const App = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/enterprise-admin" element={<EnterpriseAdminDashboard />} />
          <Route path="/content-management" element={<ContentManagement />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="/report/:id" element={<ReportDetails />} />
          <Route path="/check-status" element={<CheckStatus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
};

export default App;
