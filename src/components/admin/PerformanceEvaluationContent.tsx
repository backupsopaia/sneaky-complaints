import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  UserCheck, 
  AlertTriangle, 
  ThumbsUp 
} from 'lucide-react';
import { 
  getPerformanceData, 
  getPerformanceAlerts, 
  exportPerformanceData, 
  PerformanceSummary,
  PerformanceAlert
} from '@/services/performanceService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PerformanceEvaluationContent = () => {
  const { user, isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('resumo');
  const [timeRange, setTimeRange] = useState('últimos30dias');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [companies, setCompanies] = useState([
    { id: '1', name: 'Empresa A' },
    { id: '2', name: 'Empresa B' },
    { id: '3', name: 'Empresa C' }
  ]);
  const [performanceData, setPerformanceData] = useState<PerformanceSummary | null>(null);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPerformanceData();
    loadAlerts();
  }, [timeRange, selectedCompany]);

  const loadPerformanceData = async () => {
    try {
      setLoading(true);
      const companyId = selectedCompany !== 'all' ? selectedCompany : undefined;
      const data = await getPerformanceData(timeRange, companyId);
      setPerformanceData(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dados de desempenho:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados de desempenho.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const loadAlerts = async () => {
    try {
      const companyId = selectedCompany !== 'all' ? selectedCompany : undefined;
      const alerts = await getPerformanceAlerts(companyId);
      setAlerts(alerts);
    } catch (error) {
      console.error('Erro ao carregar alertas:', error);
    }
  };

  const handleExportData = async () => {
    try {
      toast({
        title: "Exportando dados",
        description: "Os dados estão sendo preparados para exportação...",
      });

      const companyId = selectedCompany !== 'all' ? selectedCompany : undefined;
      const blob = await exportPerformanceData(timeRange, companyId);
      
      // Criar link para download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `performance-data-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      
      // Limpar recursos
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Sucesso",
        description: "Os dados foram exportados com sucesso",
      });
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      toast({
        title: "Erro",
        description: "Não foi possível exportar os dados",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Carregando dados de desempenho...</div>;
  }

  if (!performanceData) {
    return <div>Nenhum dado disponível</div>;
  }

  const { metrics, categoryDistribution, timeSeriesData } = performanceData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Avaliação de Desempenho</h2>
        <Button variant="outline" onClick={handleExportData} className="flex items-center gap-2">
          <Download size={16} />
          Exportar Dados
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Período</label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="últimos7dias">Últimos 7 dias</SelectItem>
              <SelectItem value="últimos30dias">Últimos 30 dias</SelectItem>
              <SelectItem value="últimos90dias">Últimos 90 dias</SelectItem>
              <SelectItem value="últimos6meses">Últimos 6 meses</SelectItem>
              <SelectItem value="último1ano">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isSuperAdmin && (
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Empresa</label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as empresas</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-sm font-medium">Total de Denúncias</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalReports}</div>
            <p className="text-xs text-muted-foreground">
              {performanceData.comparisonPercentages.reportsChange > 0 ? '+' : ''}
              {performanceData.comparisonPercentages.reportsChange}% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-sm font-medium">Taxa de Resolução</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((metrics.resolvedReports / metrics.totalReports) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {performanceData.comparisonPercentages.resolutionTimeChange > 0 ? '+' : ''}
              {performanceData.comparisonPercentages.resolutionTimeChange}% em relação ao período anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-sm font-medium">Satisfação</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.satisfactionRate}/5</div>
            <p className="text-xs text-muted-foreground">
              Baseado em {metrics.resolvedReports} avaliações
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="tendencias">Tendências</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="tempoResolucao">Tempo de Resolução</TabsTrigger>
        </TabsList>

        <TabsContent value="resumo">
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeSeriesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reports" fill="#8884d8" name="Denúncias" />
                    <Bar dataKey="resolved" fill="#82ca9d" name="Resolvidas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tendencias">
          <Card>
            <CardHeader>
              <CardTitle>Tendências ao Longo do Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeSeriesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="reports" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="Denúncias"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="resolved" 
                      stroke="#82ca9d" 
                      name="Resolvidas"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categorias">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Categorias</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-80 w-full max-w-md">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} denúncias`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tempoResolucao">
          <Card>
            <CardHeader>
              <CardTitle>Tempo Médio de Resolução</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeSeriesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reports" fill="#8884d8" name="Dias para Resolução" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Denúncias por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Resolvidas</span>
                </div>
                <span className="font-medium">
                  {metrics.resolvedReports} ({Math.round((metrics.resolvedReports / metrics.totalReports) * 100)}%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Em Progresso</span>
                </div>
                <span className="font-medium">
                  {metrics.inProgressReports} ({Math.round((metrics.inProgressReports / metrics.totalReports) * 100)}%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Pendentes</span>
                </div>
                <span className="font-medium">
                  {metrics.pendingReports} ({Math.round((metrics.pendingReports / metrics.totalReports) * 100)}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      alert.type === 'danger' 
                        ? 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900' 
                        : 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-100 dark:border-yellow-900'
                    }`}
                  >
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      alert.type === 'danger' ? 'text-red-600' : 'text-yellow-600'
                    }`} />
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  Nenhum alerta de desempenho no momento
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceEvaluationContent;
