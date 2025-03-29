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
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  UserCheck, 
  AlertTriangle, 
  ThumbsUp,
  Filter,
  BarChart as BarChartIcon
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  getPerformanceData, 
  getPerformanceAlerts, 
  exportPerformanceData, 
  PerformanceSummary,
  PerformanceAlert,
  TimeSeriesData,
  CategoryDistribution
} from '@/services/performanceService';
import InteractivePerformanceMetrics from './InteractivePerformanceMetrics';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PerformanceDashboard = () => {
  const { user, isSuperAdmin } = useAuth();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('últimos30dias');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [chartView, setChartView] = useState('barras');
  const [companies, setCompanies] = useState([
    { id: '1', name: 'Empresa A' },
    { id: '2', name: 'Empresa B' },
    { id: '3', name: 'Empresa C' }
  ]);
  const [performanceData, setPerformanceData] = useState<PerformanceSummary | null>(null);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);

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
      
      // Preparar dados da tabela
      prepareTableData(data.timeSeriesData);
      
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

  const prepareTableData = (timeSeriesData: TimeSeriesData[]) => {
    const processed = timeSeriesData.map(item => ({
      data: item.date,
      denuncias: item.reports,
      resolvidas: item.resolved,
      pendentes: item.reports - item.resolved,
      taxaResolucao: ((item.resolved / item.reports) * 100).toFixed(1) + '%',
      variacao: getVariation(item, timeSeriesData)
    }));
    
    setTableData(processed);
  };
  
  const getVariation = (currentItem: TimeSeriesData, allData: TimeSeriesData[]) => {
    const index = allData.findIndex(item => item.date === currentItem.date);
    if (index <= 0) return '-';
    
    const prevItem = allData[index - 1];
    const variation = ((currentItem.reports - prevItem.reports) / prevItem.reports) * 100;
    
    return variation > 0 
      ? `+${variation.toFixed(1)}%` 
      : `${variation.toFixed(1)}%`;
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
    return <div className="flex items-center justify-center h-full">Carregando dados de desempenho...</div>;
  }

  if (!performanceData) {
    return <div className="flex items-center justify-center h-full">Nenhum dado disponível</div>;
  }

  const { metrics, categoryDistribution, timeSeriesData } = performanceData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Dashboard de Desempenho</h2>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
          </Button>
        </div>
        <Button variant="outline" onClick={handleExportData} className="flex items-center gap-2">
          <Download size={16} />
          Exportar Dados
        </Button>
      </div>

      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageResolutionTime} dias</div>
            <p className="text-xs text-muted-foreground">
              Para resolução de denúncias
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InteractivePerformanceMetrics 
          timeSeriesData={timeSeriesData}
          activeView={chartView}
          onViewChange={setChartView}
        />

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
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

            <div className="mt-4 space-y-2">
              {categoryDistribution.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                    />
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">{category.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Dados Detalhados</CardTitle>
          <BarChartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Denúncias</TableHead>
                  <TableHead>Resolvidas</TableHead>
                  <TableHead>Pendentes</TableHead>
                  <TableHead>Taxa Resolução</TableHead>
                  <TableHead>Variação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.data}</TableCell>
                    <TableCell>{row.denuncias}</TableCell>
                    <TableCell>{row.resolvidas}</TableCell>
                    <TableCell>{row.pendentes}</TableCell>
                    <TableCell>{row.taxaResolucao}</TableCell>
                    <TableCell>
                      <span className={row.variacao.startsWith('+') ? 'text-green-600' : row.variacao === '-' ? 'text-gray-500' : 'text-red-600'}>
                        {row.variacao}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
  );
};

export default PerformanceDashboard; 