
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import CheckReportStatus from '@/components/report/CheckReportStatus';

const CheckStatus = () => {
  const [trackingCode, setTrackingCode] = useState('');
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container pt-24 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-center">Verificar Status da Denúncia</CardTitle>
            </CardHeader>
            <CardContent>
              <CheckReportStatus />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckStatus;
