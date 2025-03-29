import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  TrendingUp,
  Users
} from 'lucide-react';
import { Card } from '@/components/ui/card-motion';
import { cn } from '@/lib/utils';

interface Stat {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  description: string;
}

const stats: Stat[] = [
  {
    title: "Total de Denúncias",
    value: "1,234",
    change: 12,
    icon: FileText,
    description: "Denúncias recebidas este mês"
  },
  {
    title: "Em Análise",
    value: "45",
    icon: Clock,
    description: "Denúncias em processo de investigação"
  },
  {
    title: "Resolvidas",
    value: "892",
    change: 8,
    icon: CheckCircle2,
    description: "Denúncias resolvidas este mês"
  },
  {
    title: "Críticas",
    value: "23",
    change: -5,
    icon: AlertTriangle,
    description: "Denúncias de alta prioridade"
  },
  {
    title: "Usuários Ativos",
    value: "456",
    change: 15,
    icon: Users,
    description: "Usuários ativos na plataforma"
  },
  {
    title: "Taxa de Resolução",
    value: "94%",
    change: 3,
    icon: TrendingUp,
    description: "Percentual de denúncias resolvidas"
  }
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="relative overflow-hidden"
          hover={false}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              {stat.change !== undefined && (
                <div className={cn(
                  "text-sm font-medium flex items-center gap-1",
                  stat.change > 0 ? "text-success" : "text-destructive"
                )}>
                  {stat.change > 0 ? "+" : ""}{stat.change}%
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </h3>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          </motion.div>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
