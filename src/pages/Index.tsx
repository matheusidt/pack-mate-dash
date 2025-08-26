import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ComplianceChart } from "@/components/dashboard/ComplianceChart";
import { MachineStatusChart } from "@/components/dashboard/MachineStatusChart";
import { RecentChecklistsTable } from "@/components/dashboard/RecentChecklistsTable";
import { ChecklistUpload } from "@/components/dashboard/ChecklistUpload";
import { useChecklistMetrics } from "@/hooks/useChecklistData";
import { 
  CheckSquare, 
  AlertTriangle, 
  TrendingUp, 
  Package,
  Users,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Index = () => {
  const { metrics, chartData, machineData, checklists, isLoading, error } = useChecklistMetrics();
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível conectar ao banco de dados. Verifique sua conexão.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando dados do dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard de Qualidade</h1>
            <p className="text-muted-foreground mt-1">
              Monitoramento em tempo real de conformidades e desempenho das máquinas
            </p>
          </div>
          <div className="bg-gradient-to-r from-primary to-primary-glow text-white px-4 py-2 rounded-lg shadow-lg">
            <span className="text-sm font-medium">Última atualização: agora</span>
          </div>
        </div>

        {/* Upload de Dados */}
        <ChecklistUpload />

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard
            title="Total de Checklists"
            value={metrics.total}
            icon={CheckSquare}
            description="Verificações realizadas"
          />
          
          <MetricCard
            title="Conformes"
            value={metrics.conformes}
            change={`${metrics.percentualConformidade}%`}
            changeType={metrics.percentualConformidade >= 90 ? "positive" : metrics.percentualConformidade >= 70 ? "neutral" : "negative"}
            icon={Target}
            description="Verificações aprovadas"
          />
          
          <MetricCard
            title="Não Conformes"
            value={metrics.naoConformes}
            change={`${Math.round((metrics.naoConformes / Math.max(metrics.total, 1)) * 100)}%`}
            changeType={metrics.naoConformes > metrics.conformes ? "negative" : "positive"}
            icon={AlertTriangle}
            description="Verificações reprovadas"
          />
          
          <MetricCard
            title="% Conformidade"
            value={`${metrics.percentualConformidade}%`}
            changeType={metrics.percentualConformidade >= 90 ? "positive" : metrics.percentualConformidade >= 70 ? "neutral" : "negative"}
            icon={TrendingUp}
            description="Taxa geral de conformidade"
          />
          
          <MetricCard
            title="Máquinas"
            value={metrics.maquinasAuditadas}
            icon={Package}
            description="Máquinas auditadas"
          />
          
          <MetricCard
            title="Auditores"
            value={metrics.auditoresAtivos}
            icon={Users}
            description="Auditores ativos"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComplianceChart data={chartData} />
          <MachineStatusChart data={machineData} />
        </div>

        {/* Tabela de Checklists Recentes */}
        <RecentChecklistsTable data={checklists || []} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
