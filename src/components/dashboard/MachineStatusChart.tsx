import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

interface MachineStatusChartProps {
  data: Array<{
    machine: string;
    conformes: number;
    naoConformes: number;
    total: number;
  }>;
  title?: string;
}

export function MachineStatusChart({ data, title = "Status por Máquina" }: MachineStatusChartProps) {
  const processedData = data.map(item => ({
    ...item,
    percentualConformidade: item.total > 0 ? Math.round((item.conformes / item.total) * 100) : 0,
    status: item.total > 0 ? (item.conformes / item.total >= 0.9 ? "excellent" : item.conformes / item.total >= 0.7 ? "good" : "warning") : "no-data"
  }));

  const getBarColor = (status: string) => {
    switch (status) {
      case "excellent": return "hsl(var(--success))";
      case "good": return "hsl(var(--primary))";
      case "warning": return "hsl(var(--warning))";
      default: return "hsl(var(--muted))";
    }
  };

  return (
    <Card className="chart-container animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="machine" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 100]}
              label={{ value: '% Conformidade', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
              formatter={(value, name) => [`${value}%`, "Conformidade"]}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Bar 
              dataKey="percentualConformidade" 
              radius={[4, 4, 0, 0]}
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}