import { api } from './api';

export interface PerformanceMetrics {
  totalReports: number;
  resolvedReports: number;
  inProgressReports: number;
  pendingReports: number;
  averageResolutionTime: number;
  satisfactionRate: number;
}

export interface CategoryDistribution {
  name: string;
  value: number;
}

export interface TimeSeriesData {
  date: string;
  reports: number;
  resolved: number;
  averageResponseTime: number; // Tempo médio de resposta em dias
}

export interface PerformanceSummary {
  metrics: PerformanceMetrics;
  categoryDistribution: CategoryDistribution[];
  timeSeriesData: TimeSeriesData[];
  comparisonPercentages: {
    reportsChange: number;
    resolutionTimeChange: number;
    satisfactionChange: number;
  };
}

export interface PerformanceAlert {
  type: 'warning' | 'danger';
  title: string;
  description: string;
}

// Função para obter dados de desempenho dentro de um período
export const getPerformanceData = async (
  timeRange: string,
  companyId?: string
): Promise<PerformanceSummary> => {
  try {
    // Em uma aplicação real, você faria uma chamada à API
    // const response = await api.get('/performance', { params: { timeRange, companyId } });
    // return response.data;
    
    // Por enquanto, retornaremos dados simulados
    return getMockPerformanceData(timeRange, companyId);
  } catch (error) {
    console.error('Erro ao obter dados de desempenho:', error);
    throw error;
  }
};

// Função para obter alertas de desempenho
export const getPerformanceAlerts = async (
  companyId?: string
): Promise<PerformanceAlert[]> => {
  try {
    // Em uma aplicação real, você faria uma chamada à API
    // const response = await api.get('/performance/alerts', { params: { companyId } });
    // return response.data;
    
    // Por enquanto, retornaremos dados simulados
    return [
      {
        type: 'danger',
        title: 'Alto volume de denúncias de Assédio',
        description: 'Aumento de 25% no último mês'
      },
      {
        type: 'warning',
        title: 'Tempo de resolução acima da meta',
        description: 'Para denúncias de Fraude (média de 12 dias)'
      },
      {
        type: 'warning',
        title: 'Queda na satisfação dos usuários',
        description: 'Diminuição de 0.5 pontos na avaliação média'
      }
    ];
  } catch (error) {
    console.error('Erro ao obter alertas de desempenho:', error);
    throw error;
  }
};

// Função para exportar dados de desempenho em CSV
export const exportPerformanceData = async (
  timeRange: string,
  companyId?: string
): Promise<Blob> => {
  try {
    // Em uma aplicação real, você faria uma chamada à API
    // const response = await api.get('/performance/export', { 
    //   params: { timeRange, companyId },
    //   responseType: 'blob'
    // });
    // return response.data;
    
    // Por enquanto, simularemos um delay e retornaremos um blob vazio
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Gerar dados para CSV
    const { timeSeriesData } = getMockPerformanceData(timeRange, companyId);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Data,Denúncias,Resolvidas,Taxa Resolução\n";
    
    timeSeriesData.forEach(row => {
      const taxaResolucao = ((row.resolved / row.reports) * 100).toFixed(1);
      csvContent += `${row.date},${row.reports},${row.resolved},${taxaResolucao}%\n`;
    });
    
    return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  } catch (error) {
    console.error('Erro ao exportar dados de desempenho:', error);
    throw error;
  }
};

// Função auxiliar para gerar dados de série temporal
const generateTimeSeriesData = (timeRange: string, multiplier: number = 1): TimeSeriesData[] => {
  const data: TimeSeriesData[] = [];
  
  // O número de pontos de dados depende do intervalo de tempo
  let numberOfPoints = 6;
  switch (timeRange) {
    case 'últimos7dias':
      numberOfPoints = 7;
      break;
    case 'últimos30dias':
      numberOfPoints = 10;
      break;
    case 'últimos90dias':
      numberOfPoints = 12;
      break;
    case 'últimos6meses':
      numberOfPoints = 6;
      break;
    case 'último1ano':
      numberOfPoints = 12;
      break;
    default:
      numberOfPoints = 6;
  }
  
  // Seed para criar padrões reconhecíveis nos dados
  const baseReports = [8, 12, 15, 10, 18, 22, 17, 14, 19, 25, 20, 16];
  const efficiencyRatio = [0.7, 0.75, 0.8, 0.85, 0.9, 0.85, 0.8, 0.75, 0.85, 0.9, 0.85, 0.8];
  const responseTimes = [2.5, 3.0, 3.5, 2.8, 3.2, 3.8, 3.1, 2.9, 3.3, 3.6, 3.4, 3.2]; // Tempos médios de resposta em dias
  
  // Gerar pontos de dados simulados
  for (let i = 0; i < numberOfPoints; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (numberOfPoints - i));
    
    // Usar o array de base se possível, caso contrário gerar aleatório
    const baseReport = i < baseReports.length ? baseReports[i] : Math.floor(Math.random() * 10) + 5;
    const efficiency = i < efficiencyRatio.length ? efficiencyRatio[i] : 0.7 + Math.random() * 0.3;
    const responseTime = i < responseTimes.length ? responseTimes[i] : 2.5 + Math.random() * 2;
    
    const reports = Math.floor(baseReport * multiplier);
    const resolved = Math.floor(reports * efficiency);
    
    data.push({
      date: date.toISOString().split('T')[0],
      reports,
      resolved,
      averageResponseTime: responseTime
    });
  }
  
  return data;
};

// Função para calcular o tempo médio de resposta
const calculateAverageResponseTime = (timeSeriesData: TimeSeriesData[]): number => {
  if (timeSeriesData.length === 0) return 0;
  
  const totalResponseTime = timeSeriesData.reduce((sum, data) => sum + data.averageResponseTime, 0);
  return totalResponseTime / timeSeriesData.length;
};

// Função para obter dados simulados de desempenho
const getMockPerformanceData = (
  timeRange: string,
  companyId?: string
): PerformanceSummary => {
  // Ajustar os valores baseados na empresa (apenas para simulação)
  const multiplier = companyId ? 
    companyId === '1' ? 1.2 : 
    companyId === '2' ? 0.8 : 
    companyId === '3' ? 1.5 : 1 
    : 1;
    
  // Gerar dados de série temporal baseados no timeRange
  const timeSeriesData: TimeSeriesData[] = generateTimeSeriesData(timeRange, multiplier);
  
  // Calcular o tempo médio de resposta
  const averageResponseTime = calculateAverageResponseTime(timeSeriesData);
    
  // Podemos ajustar os dados baseados no timeRange e companyId
  const metrics: PerformanceMetrics = {
    totalReports: Math.round(87 * multiplier),
    resolvedReports: Math.round(74 * multiplier),
    inProgressReports: Math.round(8 * multiplier),
    pendingReports: Math.round(5 * multiplier),
    averageResolutionTime: averageResponseTime, // Usar o tempo médio calculado
    satisfactionRate: 4.8 // em escala de 1-5
  };

  const categoryDistribution: CategoryDistribution[] = [
    { name: 'Assédio', value: Math.round(35 * multiplier) },
    { name: 'Fraude', value: Math.round(25 * multiplier) },
    { name: 'Corrupção', value: Math.round(20 * multiplier) },
    { name: 'Discriminação', value: Math.round(15 * multiplier) },
    { name: 'Outros', value: Math.round(5 * multiplier) }
  ];

  // Ajustar percentuais de comparação baseados na empresa
  const comparisonMultiplier = companyId ? 
    companyId === '1' ? 1.5 : 
    companyId === '2' ? 0.7 : 
    companyId === '3' ? 2.0 : 1 
    : 1;

  return {
    metrics,
    categoryDistribution,
    timeSeriesData,
    comparisonPercentages: {
      reportsChange: 12 * comparisonMultiplier,
      resolutionTimeChange: -5 * comparisonMultiplier,
      satisfactionChange: 2 * comparisonMultiplier
    }
  };
}; 