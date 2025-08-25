import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  return (
    <header className="dashboard-header border-b border-dashboard-border h-16 flex items-center px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:bg-white/10" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-glow rounded-lg flex items-center justify-center">
            <span className="text-dashboard-header font-bold text-sm">PM</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">PackMate Dashboard</h1>
            <p className="text-xs text-white/70">Controle de Qualidade</p>
          </div>
        </div>
      </div>
    </header>
  );
}