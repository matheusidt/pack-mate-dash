import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ChecklistData {
  id: number;
  Data: string;
  Turno: number;
  OP: number;
  Auditor: string;
  Máquina: string;
  "Todos os ocumento estão na pasta?": string;
  created_at: string;
}

interface RecentChecklistsTableProps {
  data: ChecklistData[];
  title?: string;
}

export function RecentChecklistsTable({ data, title = "Checklists Recentes" }: RecentChecklistsTableProps) {
  const getStatusBadge = (status: string) => {
    const normalizedStatus = status?.toLowerCase().trim();
    
    if (normalizedStatus === "sim" || normalizedStatus === "conforme" || normalizedStatus === "ok") {
      return <Badge className="status-success">Conforme</Badge>;
    } else if (normalizedStatus === "não" || normalizedStatus === "nao" || normalizedStatus === "não conforme") {
      return <Badge className="status-error">Não Conforme</Badge>;
    } else {
      return <Badge className="status-warning">Pendente</Badge>;
    }
  };

  const getTurnoLabel = (turno: number) => {
    switch (turno) {
      case 1: return "1º Turno";
      case 2: return "2º Turno"; 
      case 3: return "3º Turno";
      default: return `Turno ${turno}`;
    }
  };

  return (
    <Card className="dashboard-card animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-dashboard-border">
          <Table>
            <TableHeader>
              <TableRow className="border-dashboard-border">
                <TableHead className="font-semibold">Data</TableHead>
                <TableHead className="font-semibold">Máquina</TableHead>
                <TableHead className="font-semibold">Turno</TableHead>
                <TableHead className="font-semibold">OP</TableHead>
                <TableHead className="font-semibold">Auditor</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum checklist encontrado
                  </TableCell>
                </TableRow>
              ) : (
                data.slice(0, 10).map((checklist) => (
                  <TableRow key={checklist.id} className="border-dashboard-border hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {checklist.Data ? format(new Date(checklist.Data), "dd/MM/yyyy", { locale: ptBR }) : "-"}
                    </TableCell>
                    <TableCell>{checklist.Máquina || "-"}</TableCell>
                    <TableCell>{checklist.Turno ? getTurnoLabel(checklist.Turno) : "-"}</TableCell>
                    <TableCell className="font-mono">{checklist.OP || "-"}</TableCell>
                    <TableCell>{checklist.Auditor || "-"}</TableCell>
                    <TableCell>
                      {getStatusBadge(checklist["Todos os ocumento estão na pasta?"])}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}