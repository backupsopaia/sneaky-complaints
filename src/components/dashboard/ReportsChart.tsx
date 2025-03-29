import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card-motion';
import { useTheme } from '@/context/theme/useTheme';

const data = [
  { name: 'Jan', total: 45 },
  { name: 'Fev', total: 38 },
  { name: 'Mar', total: 52 },
  { name: 'Abr', total: 41 },
  { name: 'Mai', total: 47 },
  { name: 'Jun', total: 53 },
  { name: 'Jul', total: 49 },
  { name: 'Ago', total: 55 },
  { name: 'Set', total: 48 },
  { name: 'Out', total: 43 },
  { name: 'Nov', total: 58 },
  { name: 'Dez', total: 51 }
];

const ReportsChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Denúncias por Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="rgb(37, 99, 235)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="100%"
                    stopColor="rgb(37, 99, 235)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                stroke={isDark ? "#94a3b8" : "#64748b"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={isDark ? "#94a3b8" : "#64748b"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#334155" : "#e2e8f0"}
                vertical={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Total
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="rgb(37, 99, 235)"
                strokeWidth={2}
                fill="url(#total)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsChart;
