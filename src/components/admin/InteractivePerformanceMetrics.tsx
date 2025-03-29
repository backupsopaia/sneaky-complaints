import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area
} from 'recharts';
import { TimeSeriesData } from '@/services/performanceService';

interface InteractivePerformanceMetricsProps {
  timeSeriesData: TimeSeriesData[];
  activeView: string;
  onViewChange: (view: string) => void;
}

const InteractivePerformanceMetrics: React.FC<InteractivePerformanceMetricsProps> = ({
  timeSeriesData,
  activeView,
  onViewChange
}) => {
  const [highlightedMetric, setHighlightedMetric] = useState<string | null>(null);

  const highlightMetric = (metric: string) => {
    setHighlightedMetric(highlightedMetric === metric ? null : metric);
  };

  // Calcular dados derivados
  const derivedData = timeSeriesData.map(item => ({
    ...item,
    efficiency: item.resolved / (item.reports || 1) * 100,
    backlog: item.reports - item.resolved,
    responseTime: item.averageResponseTime
  }));

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Desempenho ao Longo do Tempo</CardTitle>
        <div className="flex gap-2 flex-wrap">
          <span 
            className={`px-2 py-1 rounded-full text-xs cursor-pointer ${highlightedMetric === 'reports' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}
            onClick={() => highlightMetric('reports')}
          >
            Denúncias
          </span>
          <span 
            className={`px-2 py-1 rounded-full text-xs cursor-pointer ${highlightedMetric === 'resolved' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}
            onClick={() => highlightMetric('resolved')}
          >
            Resolvidas
          </span>
          <span 
            className={`px-2 py-1 rounded-full text-xs cursor-pointer ${highlightedMetric === 'efficiency' 
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}
            onClick={() => highlightMetric('efficiency')}
          >
            Eficiência
          </span>
          <span 
            className={`px-2 py-1 rounded-full text-xs cursor-pointer ${highlightedMetric === 'backlog' 
              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}
            onClick={() => highlightMetric('backlog')}
          >
            Backlog
          </span>
          <span 
            className={`px-2 py-1 rounded-full text-xs cursor-pointer ${highlightedMetric === 'responseTime' 
              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' 
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}`}
            onClick={() => highlightMetric('responseTime')}
          >
            Tempo de Resposta
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeView} onValueChange={onViewChange} className="space-y-4">
          <TabsList>
            <TabsTrigger value="barras">Barras</TabsTrigger>
            <TabsTrigger value="linhas">Linhas</TabsTrigger>
            <TabsTrigger value="composto">Composto</TabsTrigger>
            <TabsTrigger value="area">Área</TabsTrigger>
          </TabsList>

          <TabsContent value="barras">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={derivedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'efficiency') return [`${value.toFixed(1)}%`, 'Eficiência'];
                      if (name === 'backlog') return [value, 'Backlog'];
                      if (name === 'reports') return [value, 'Denúncias'];
                      if (name === 'resolved') return [value, 'Resolvidas'];
                      if (name === 'responseTime') return [`${Number(value).toFixed(1)} dias`, 'Tempo de Resposta'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="reports" 
                    fill="#8884d8" 
                    name="Denúncias" 
                    opacity={!highlightedMetric || highlightedMetric === 'reports' ? 1 : 0.3} 
                  />
                  <Bar 
                    dataKey="resolved" 
                    fill="#82ca9d" 
                    name="Resolvidas" 
                    opacity={!highlightedMetric || highlightedMetric === 'resolved' ? 1 : 0.3} 
                  />
                  {highlightedMetric === 'efficiency' && (
                    <Bar 
                      dataKey="efficiency" 
                      fill="#9370DB" 
                      name="Eficiência (%)" 
                    />
                  )}
                  {highlightedMetric === 'backlog' && (
                    <Bar 
                      dataKey="backlog" 
                      fill="#FF6347" 
                      name="Backlog" 
                    />
                  )}
                  {highlightedMetric === 'responseTime' && (
                    <Bar 
                      dataKey="responseTime" 
                      fill="#FFA500" 
                      name="Tempo de Resposta (dias)" 
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="linhas">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={derivedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'efficiency') return [`${value.toFixed(1)}%`, 'Eficiência'];
                      if (name === 'backlog') return [value, 'Backlog'];
                      if (name === 'reports') return [value, 'Denúncias'];
                      if (name === 'resolved') return [value, 'Resolvidas'];
                      if (name === 'responseTime') return [`${Number(value).toFixed(1)} dias`, 'Tempo de Resposta'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="reports" 
                    stroke="#8884d8" 
                    name="Denúncias" 
                    strokeWidth={!highlightedMetric || highlightedMetric === 'reports' ? 2 : 1} 
                    opacity={!highlightedMetric || highlightedMetric === 'reports' ? 1 : 0.3} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="resolved" 
                    stroke="#82ca9d" 
                    name="Resolvidas" 
                    strokeWidth={!highlightedMetric || highlightedMetric === 'resolved' ? 2 : 1} 
                    opacity={!highlightedMetric || highlightedMetric === 'resolved' ? 1 : 0.3} 
                  />
                  {highlightedMetric === 'efficiency' && (
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#9370DB" 
                      name="Eficiência (%)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  )}
                  {highlightedMetric === 'backlog' && (
                    <Line 
                      type="monotone" 
                      dataKey="backlog" 
                      stroke="#FF6347" 
                      name="Backlog" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  )}
                  {highlightedMetric === 'responseTime' && (
                    <Line 
                      type="monotone" 
                      dataKey="responseTime" 
                      stroke="#FFA500" 
                      name="Tempo de Resposta (dias)" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="composto">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={derivedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'efficiency') return [`${value.toFixed(1)}%`, 'Eficiência'];
                      if (name === 'backlog') return [value, 'Backlog'];
                      if (name === 'reports') return [value, 'Denúncias'];
                      if (name === 'resolved') return [value, 'Resolvidas'];
                      if (name === 'responseTime') return [`${Number(value).toFixed(1)} dias`, 'Tempo de Resposta'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="reports" 
                    fill="#8884d8" 
                    name="Denúncias" 
                    opacity={!highlightedMetric || highlightedMetric === 'reports' ? 1 : 0.3} 
                  />
                  <Bar 
                    dataKey="resolved" 
                    fill="#82ca9d" 
                    name="Resolvidas" 
                    opacity={!highlightedMetric || highlightedMetric === 'resolved' ? 1 : 0.3} 
                  />
                  {highlightedMetric === 'efficiency' && (
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#9370DB" 
                      name="Eficiência (%)" 
                      strokeWidth={2}
                    />
                  )}
                  {highlightedMetric === 'backlog' && (
                    <Line 
                      type="monotone" 
                      dataKey="backlog" 
                      stroke="#FF6347" 
                      name="Backlog" 
                      strokeWidth={2}
                    />
                  )}
                  {highlightedMetric === 'responseTime' && (
                    <Line 
                      type="monotone" 
                      dataKey="responseTime" 
                      stroke="#FFA500" 
                      name="Tempo de Resposta (dias)" 
                      strokeWidth={2}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="area">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={derivedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'efficiency') return [`${value.toFixed(1)}%`, 'Eficiência'];
                      if (name === 'backlog') return [value, 'Backlog'];
                      if (name === 'reports') return [value, 'Denúncias'];
                      if (name === 'resolved') return [value, 'Resolvidas'];
                      if (name === 'responseTime') return [`${Number(value).toFixed(1)} dias`, 'Tempo de Resposta'];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="reports" 
                    fill="#8884d8" 
                    stroke="#8884d8"
                    fillOpacity={0.2}
                    name="Denúncias" 
                    opacity={!highlightedMetric || highlightedMetric === 'reports' ? 1 : 0.3} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="resolved" 
                    fill="#82ca9d" 
                    stroke="#82ca9d"
                    fillOpacity={0.2}
                    name="Resolvidas" 
                    opacity={!highlightedMetric || highlightedMetric === 'resolved' ? 1 : 0.3} 
                  />
                  {highlightedMetric === 'efficiency' && (
                    <Area 
                      type="monotone" 
                      dataKey="efficiency" 
                      fill="#9370DB" 
                      stroke="#9370DB"
                      fillOpacity={0.2}
                      name="Eficiência (%)" 
                    />
                  )}
                  {highlightedMetric === 'backlog' && (
                    <Area 
                      type="monotone" 
                      dataKey="backlog" 
                      fill="#FF6347" 
                      stroke="#FF6347"
                      fillOpacity={0.2}
                      name="Backlog" 
                    />
                  )}
                  {highlightedMetric === 'responseTime' && (
                    <Area 
                      type="monotone" 
                      dataKey="responseTime" 
                      fill="#FFA500" 
                      stroke="#FFA500"
                      fillOpacity={0.2}
                      name="Tempo de Resposta (dias)" 
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InteractivePerformanceMetrics; 