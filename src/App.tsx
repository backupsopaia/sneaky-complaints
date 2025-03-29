import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppLayout from '@/components/layout/AppLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import PageTransition from '@/components/layout/PageTransition';
import CookieConsent from '@/components/CookieConsent';
import Home from '@/pages/Home';
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
import Pricing from '@/pages/Pricing';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import UseCases from '@/pages/UseCases';
import Testimonials from '@/pages/Testimonials';
import Features from '@/pages/Features';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';
import DataProtection from '@/pages/DataProtection';
import { ContentProvider } from '@/context/content/ContentContext';

function App() {
  return (
    <ContentProvider>
        <Routes>
        <Route path="/admin-dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/enterprise-admin" element={<AdminLayout><EnterpriseAdminDashboard /></AdminLayout>} />
        <Route path="/content-management" element={<AdminLayout><ContentManagement /></AdminLayout>} />
        <Route path="/" element={<AppLayout><PageTransition><Index /></PageTransition></AppLayout>} />
        <Route path="/pricing" element={<AppLayout><PageTransition><Pricing /></PageTransition></AppLayout>} />
        <Route path="/login" element={<AppLayout><PageTransition><Login /></PageTransition></AppLayout>} />
        <Route path="/register" element={<AppLayout><PageTransition><Register /></PageTransition></AppLayout>} />
        <Route path="/dashboard" element={<AppLayout><PageTransition><Dashboard /></PageTransition></AppLayout>} />
        <Route path="/report" element={<AppLayout><PageTransition><ReportForm /></PageTransition></AppLayout>} />
        <Route path="/reports" element={<Navigate to="/report" replace />} />
        <Route path="/report/:id" element={<AppLayout><PageTransition><ReportDetails /></PageTransition></AppLayout>} />
        <Route path="/check-status" element={<AppLayout><PageTransition><CheckStatus /></PageTransition></AppLayout>} />
        <Route path="/about" element={<AppLayout><PageTransition><About /></PageTransition></AppLayout>} />
        <Route path="/contact" element={<AppLayout><PageTransition><Contact /></PageTransition></AppLayout>} />
        <Route path="/use-cases" element={<AppLayout><PageTransition><UseCases /></PageTransition></AppLayout>} />
        <Route path="/testimonials" element={<AppLayout><PageTransition><Testimonials /></PageTransition></AppLayout>} />
        <Route path="/features" element={<AppLayout><PageTransition><Features /></PageTransition></AppLayout>} />
        <Route path="/terms" element={<AppLayout><PageTransition><Terms /></PageTransition></AppLayout>} />
        <Route path="/privacy" element={<AppLayout><PageTransition><Privacy /></PageTransition></AppLayout>} />
        <Route path="/cookies" element={<AppLayout><PageTransition><Cookies /></PageTransition></AppLayout>} />
        <Route path="/data-protection" element={<AppLayout><PageTransition><DataProtection /></PageTransition></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      <CookieConsent />
    </ContentProvider>
  );
}

export default App;
