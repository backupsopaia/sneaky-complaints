import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import CheckReportStatus from '@/components/report/CheckReportStatus';

const CheckStatus = () => {
  const [trackingCode, setTrackingCode] = useState('');
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">
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
      </main>
    </div>
  );
};

export default CheckStatus;
