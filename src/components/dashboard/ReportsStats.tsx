
import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for the charts
const statusData = [
  { name: 'Pendente', value: 2, color: '#FBBF24' },
  { name: 'Em Análise', value: 5, color: '#3B82F6' },
  { name: 'Investigação', value: 3, color: '#8B5CF6' },
  { name: 'Concluído', value: 8, color: '#10B981' },
];

const categoryData = [
  { name: 'Assédio Moral', value: 6, color: '#F59E0B' },
  { name: 'Assédio Sexual', value: 2, color: '#EC4899' },
  { name: 'Fraude', value: 4, color: '#3B82F6' },
  { name: 'Corrupção', value: 3, color: '#8B5CF6' },
  { name: 'Conflito de Interesses', value: 3, color: '#6366F1' },
];

const monthlyData = [
  { name: 'Jan', count: 2 },
  { name: 'Fev', count: 3 },
  { name: 'Mar', count: 5 },
  { name: 'Abr', count: 4 },
  { name: 'Mai', count: 7 },
  { name: 'Jun', count: 6 },
];

interface ReportsStatsProps {
  className?: string;
}

const ReportsStats = ({ className }: ReportsStatsProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Estatísticas de Denúncias</CardTitle>
        <CardDescription>Análise das denúncias recebidas</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4 grid grid-cols-3 h-auto">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="category">Por Categoria</TabsTrigger>
            <TabsTrigger value="monthly">Tendência Mensal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">18</div>
                    <p className="text-xs text-gray-500 mt-1">Todas as denúncias</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Anônimas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12</div>
                    <p className="text-xs text-gray-500 mt-1">67% do total</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Em Aberto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">10</div>
                    <p className="text-xs text-gray-500 mt-1">56% do total</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Resolvidas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">8</div>
                    <p className="text-xs text-gray-500 mt-1">44% do total</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
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
            </div>
          </TabsContent>
          
          <TabsContent value="category">
            <div className="h-96">
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
          
          <TabsContent value="monthly">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip formatter={(value) => [`${value} denúncias`, 'Quantidade']} />
                  <Bar dataKey="count" fill="#8884d8" name="Denúncias" radius={[4, 4, 0, 0]}>
                    {monthlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportsStats;
