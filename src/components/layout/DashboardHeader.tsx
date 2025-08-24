import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <header className="dashboard-header border-b border-dashboard-border h-16 flex items-center justify-between px-6">
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

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input
            placeholder="Buscar máquinas, auditores..."
            className="pl-9 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white hover:bg-white/10 gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary-glow text-dashboard-header">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Supervisor</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}