export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      Checklist: {
        Row: {
          "Amostra conforme padrão de cor aprovado?": string
          "Amostras de retenção estão sendo retiradas e identificadas ?": string
          "Análise de Deslizamento em ângulo": number | null
          Auditor: string | null
          Data: string
          "Foi preenchido todos os campos Form Pd 003 02 Plano de Controle": string
          "Folha isenta de manchas, caroços ou pintas?": string
          id: number
          "Liberação de Cor está conforme o Padrão?": string
          Máquina: string | null
          "Materiais descritos na OP confere com os que estão sendo utili": string
          "N º das pilha analisadas ( informar as pilhas que foram análi": number
          Observação: string | null
          "OP - Ordem de Produção": number
          "Padrão de cor está dentro da validade?": string
          Produto: string
          "Qual é a quantidade que está mencionanda na folha de retenç": number
          "Todos os documentos estão na pasta do produto?": string
          Turno: string | null
          "ΔE da amostra conforme padrão?": string
        }
        Insert: {
          "Amostra conforme padrão de cor aprovado?": string
          "Amostras de retenção estão sendo retiradas e identificadas ?": string
          "Análise de Deslizamento em ângulo"?: number | null
          Auditor?: string | null
          Data: string
          "Foi preenchido todos os campos Form Pd 003 02 Plano de Controle": string
          "Folha isenta de manchas, caroços ou pintas?": string
          id?: number
          "Liberação de Cor está conforme o Padrão?": string
          Máquina?: string | null
          "Materiais descritos na OP confere com os que estão sendo utili": string
          "N º das pilha analisadas ( informar as pilhas que foram análi": number
          Observação?: string | null
          "OP - Ordem de Produção": number
          "Padrão de cor está dentro da validade?": string
          Produto: string
          "Qual é a quantidade que está mencionanda na folha de retenç": number
          "Todos os documentos estão na pasta do produto?": string
          Turno?: string | null
          "ΔE da amostra conforme padrão?": string
        }
        Update: {
          "Amostra conforme padrão de cor aprovado?"?: string
          "Amostras de retenção estão sendo retiradas e identificadas ?"?: string
          "Análise de Deslizamento em ângulo"?: number | null
          Auditor?: string | null
          Data?: string
          "Foi preenchido todos os campos Form Pd 003 02 Plano de Controle"?: string
          "Folha isenta de manchas, caroços ou pintas?"?: string
          id?: number
          "Liberação de Cor está conforme o Padrão?"?: string
          Máquina?: string | null
          "Materiais descritos na OP confere com os que estão sendo utili"?: string
          "N º das pilha analisadas ( informar as pilhas que foram análi"?: number
          Observação?: string | null
          "OP - Ordem de Produção"?: number
          "Padrão de cor está dentro da validade?"?: string
          Produto?: string
          "Qual é a quantidade que está mencionanda na folha de retenç"?: number
          "Todos os documentos estão na pasta do produto?"?: string
          Turno?: string | null
          "ΔE da amostra conforme padrão?"?: string
        }
        Relationships: []
      }
      "Checklist - Antilhas": {
        Row: {
          Auditor: string | null
          created_at: string
          Data: string | null
          id: number
          Máquina: string | null
          OP: number | null
          "Todos os ocumento estão na pasta?": string | null
          Turno: number | null
        }
        Insert: {
          Auditor?: string | null
          created_at?: string
          Data?: string | null
          id?: number
          Máquina?: string | null
          OP?: number | null
          "Todos os ocumento estão na pasta?"?: string | null
          Turno?: number | null
        }
        Update: {
          Auditor?: string | null
          created_at?: string
          Data?: string | null
          id?: number
          Máquina?: string | null
          OP?: number | null
          "Todos os ocumento estão na pasta?"?: string | null
          Turno?: number | null
        }
        Relationships: []
      }
      clientes_terapia: {
        Row: {
          created_at: string
          "E-mail": string | null
          Formulario: boolean | null
          id: string
          Nome: string | null
          Número: number | null
          status_bot: boolean | null
        }
        Insert: {
          created_at?: string
          "E-mail"?: string | null
          Formulario?: boolean | null
          id?: string
          Nome?: string | null
          Número?: number | null
          status_bot?: boolean | null
        }
        Update: {
          created_at?: string
          "E-mail"?: string | null
          Formulario?: boolean | null
          id?: string
          Nome?: string | null
          Número?: number | null
          status_bot?: boolean | null
        }
        Relationships: []
      }
      interacoes: {
        Row: {
          conteudo: string | null
          created_at: string
          id: string
          tipo: string
          user: string
        }
        Insert: {
          conteudo?: string | null
          created_at?: string
          id?: string
          tipo: string
          user: string
        }
        Update: {
          conteudo?: string | null
          created_at?: string
          id?: string
          tipo?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "interacoes_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["whatsapp"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string | null
          id: string
          interesse: string | null
          name: string | null
          status: Database["public"]["Enums"]["STATUS"]
          status_bot: boolean | null
          update_at: string | null
          whatsapp: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          interesse?: string | null
          name?: string | null
          status?: Database["public"]["Enums"]["STATUS"]
          status_bot?: boolean | null
          update_at?: string | null
          whatsapp: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          interesse?: string | null
          name?: string | null
          status?: Database["public"]["Enums"]["STATUS"]
          status_bot?: boolean | null
          update_at?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      log_agendamentos: {
        Row: {
          created_at: string
          hora_do_agendamento: string | null
          id: number
          status_do_agendamento: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          hora_do_agendamento?: string | null
          id?: number
          status_do_agendamento?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          hora_do_agendamento?: string | null
          id?: number
          status_do_agendamento?: string | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "log_agendamentos_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      materiais_estoque: {
        Row: {
          categoria: string | null
          criado_em: string
          descricao_produto: string | null
          id: string
          imagem_url: string | null
          marca: string | null
          nome_produto: string | null
          observacoes: string | null
          preco_promocional: number | null
          preco_unitario: number | null
          promocao_ativa: boolean | null
          quantidade_estoque: number | null
          tempo_entrega: string | null
          unidade: string | null
        }
        Insert: {
          categoria?: string | null
          criado_em?: string
          descricao_produto?: string | null
          id?: string
          imagem_url?: string | null
          marca?: string | null
          nome_produto?: string | null
          observacoes?: string | null
          preco_promocional?: number | null
          preco_unitario?: number | null
          promocao_ativa?: boolean | null
          quantidade_estoque?: number | null
          tempo_entrega?: string | null
          unidade?: string | null
        }
        Update: {
          categoria?: string | null
          criado_em?: string
          descricao_produto?: string | null
          id?: string
          imagem_url?: string | null
          marca?: string | null
          nome_produto?: string | null
          observacoes?: string | null
          preco_promocional?: number | null
          preco_unitario?: number | null
          promocao_ativa?: boolean | null
          quantidade_estoque?: number | null
          tempo_entrega?: string | null
          unidade?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      STATUS:
        | "Novo"
        | "Atendimento em andamento"
        | "Interessado no serviço"
        | "Reunião agendada"
        | "Reunião realizada"
        | "Lead perdido"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      STATUS: [
        "Novo",
        "Atendimento em andamento",
        "Interessado no serviço",
        "Reunião agendada",
        "Reunião realizada",
        "Lead perdido",
      ],
    },
  },
} as const
