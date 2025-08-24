import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  description?: string;
  children?: ReactNode;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  description,
  children 
}: MetricCardProps) {
  const getChangeColor = () => {
    if (changeType === "positive") return "text-success";
    if (changeType === "negative") return "text-destructive";
    return "text-muted-foreground";
  };

  const getChangeIcon = () => {
    if (changeType === "positive") return "↗";
    if (changeType === "negative") return "↘";
    return "→";
  };

  return (
    <Card className="metric-card animate-fade-in-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-5 w-5 text-primary opacity-70" />
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <div className="text-2xl font-bold text-foreground">
            {value}
          </div>
          {change && (
            <span className={`text-sm font-medium ${getChangeColor()} flex items-center gap-1`}>
              <span>{getChangeIcon()}</span>
              {change}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-2">
            {description}
          </p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}