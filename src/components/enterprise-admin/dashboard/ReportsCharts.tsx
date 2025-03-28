
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface ReportsChartsProps {
  reports: any[];
}

const ReportsCharts = ({ reports }: ReportsChartsProps) => {
  // Calculate category data
  const categoryCounts: Record<string, number> = {};
  reports.forEach(report => {
    categoryCounts[report.category] = (categoryCounts[report.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCounts).map(category => ({
    name: category,
    value: categoryCounts[category],
    color: getCategoryColor(category)
  }));

  // Calculate status data
  const statusCounts: Record<string, number> = {};
  reports.forEach(report => {
    statusCounts[report.status] = (statusCounts[report.status] || 0) + 1;
  });

  const statusData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status],
    color: getStatusColor(status)
  }));

  // Mock monthly data (in a real app, this would come from an API)
  const monthlyData = [
    { month: 'Jan', count: 2 },
    { month: 'Fev', count: 4 },
    { month: 'Mar', count: 3 },
    { month: 'Abr', count: 5 },
    { month: 'Mai', count: 7 },
    { month: 'Jun', count: 8 },
  ];

  return (
    <Card className="bg-white dark:bg-card">
      <CardHeader>
        <CardTitle className="text-xl">Estatísticas de Denúncias</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="category">
          <TabsList className="mb-4 grid grid-cols-3 h-auto">
            <TabsTrigger value="category">Por Categoria</TabsTrigger>
            <TabsTrigger value="status">Por Status</TabsTrigger>
            <TabsTrigger value="period">Por Período</TabsTrigger>
          </TabsList>
          
          <TabsContent value="category">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} denúncias`, 'Quantidade']} />
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="status">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={130}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} denúncias`, 'Quantidade']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="period">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value) => [`${value} denúncias`, 'Quantidade']} />
                  <Legend />
                  <Bar dataKey="count" name="Denúncias" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Utility functions for colors
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Assédio Moral': '#F59E0B',
    'Assédio Sexual': '#EC4899',
    'Fraude': '#3B82F6',
    'Segurança': '#6366F1',
    'Discriminação': '#8B5CF6',
    'Conflito de Interesses': '#10B981',
  };
  
  return colors[category] || '#64748B';
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'Novo': '#3B82F6',
    'Em Análise': '#F59E0B',
    'Resolvido': '#10B981',
  };
  
  return colors[status] || '#64748B';
}

export default ReportsCharts;
