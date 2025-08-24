import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";

interface ComplianceChartProps {
  data: Array<{
    date: string;
    conformes: number;
    naoConformes: number;
    total: number;
  }>;
  title?: string;
}

export function ComplianceChart({ data, title = "Evolução de Conformidades" }: ComplianceChartProps) {
  const processedData = data.map(item => ({
    ...item,
    percentualConformidade: item.total > 0 ? Math.round((item.conformes / item.total) * 100) : 0
  }));

  return (
    <Card className="chart-container animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={processedData}>
            <defs>
              <linearGradient id="conformes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="naoConformes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="conformes"
              stackId="1"
              stroke="hsl(var(--success))"
              fill="url(#conformes)"
              name="Conformes"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="naoConformes"
              stackId="1"
              stroke="hsl(var(--destructive))"
              fill="url(#naoConformes)"
              name="Não Conformes"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}