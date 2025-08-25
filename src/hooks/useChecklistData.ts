import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

interface ChecklistAntilhas {
  id: number;
  created_at: string;
  Data: string;
  Turno: number;
  OP: number;
  Auditor: string;
  Máquina: string;
  "Todos os ocumento estão na pasta?": string;
}

export function useChecklistData() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('checklist-antilhas-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Checklist - Antilhas'
        },
        () => {
          // Invalida e recarrega os dados quando há mudanças na tabela
          queryClient.invalidateQueries({ queryKey: ["checklist-antilhas"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["checklist-antilhas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Checklist - Antilhas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching checklist data:", error);
        throw error;
      }

      return data as ChecklistAntilhas[];
    },
    staleTime: 0, // Sempre considerar dados como obsoletos para máxima atualização
    gcTime: 1000 * 60 * 2, // 2 minutos de cache
    refetchInterval: 5000, // Refetch a cada 5 segundos para garantir sincronização
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true, // Continua refetch mesmo em background
  });
}

export function useChecklistMetrics() {
  const { data: checklists, isLoading, error } = useChecklistData();

  const metrics = {
    total: checklists?.length || 0,
    conformes: checklists?.filter(item => 
      item["Todos os ocumento estão na pasta?"]?.toLowerCase().includes("sim") ||
      item["Todos os ocumento estão na pasta?"]?.toLowerCase().includes("conforme")
    ).length || 0,
    naoConformes: checklists?.filter(item => 
      item["Todos os ocumento estão na pasta?"]?.toLowerCase().includes("não") ||
      item["Todos os ocumento estão na pasta?"]?.toLowerCase().includes("nao")
    ).length || 0,
    percentualConformidade: 0,
    maquinasAuditadas: new Set(checklists?.map(item => item.Máquina).filter(Boolean)).size || 0,
    auditoresAtivos: new Set(checklists?.map(item => item.Auditor).filter(Boolean)).size || 0,
  };

  metrics.percentualConformidade = metrics.total > 0 
    ? Math.round((metrics.conformes / metrics.total) * 100) 
    : 0;

  // Dados para gráficos
  const chartData = checklists?.reduce((acc, item) => {
    if (!item.Data) return acc;
    
    const date = new Date(item.Data).toLocaleDateString("pt-BR");
    const existing = acc.find(d => d.date === date);
    
    const isConforme = item["Todos os ocumento estão na pasta?"]?.toLowerCase().includes("sim") ||
                      item["Todos os ocumento estão na pasta?"]?.toLowerCase().includes("conforme");
    
    if (existing) {
      existing.total += 1;
      if (isConforme) {
        existing.conformes += 1;
      } else {
        existing.naoConformes += 1;
      }
    } else {
      acc.push({
        date,
        total: 1,
        conformes: isConforme ? 1 : 0,
        naoConformes: isConforme ? 0 : 1,
      });
    }
    
    return acc;
  }, [] as Array<{ date: string; total: number; conformes: number; naoConformes: number }>) || [];

  // Dados por máquina
  const machineData = checklists?.reduce((acc, item) => {
    if (!item.Máquina) return acc;
    
    const existing = acc.find(d => d.machine === item.Máquina);
    const isConforme = item["Todos os ocumento estão na pasta?"]?.toLowerCase().includes("sim") ||
                      item["Todos os ocumento estão na pasta?"]?.toLowerCase().includes("conforme");
    
    if (existing) {
      existing.total += 1;
      if (isConforme) {
        existing.conformes += 1;
      } else {
        existing.naoConformes += 1;
      }
    } else {
      acc.push({
        machine: item.Máquina,
        total: 1,
        conformes: isConforme ? 1 : 0,
        naoConformes: isConforme ? 0 : 1,
      });
    }
    
    return acc;
  }, [] as Array<{ machine: string; total: number; conformes: number; naoConformes: number }>) || [];

  return {
    metrics,
    chartData: chartData.slice(-7), // Últimos 7 dias
    machineData,
    checklists,
    isLoading,
    error,
  };
}