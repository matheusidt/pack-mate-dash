import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface ChecklistData {
  Data: string;
  Auditor: string;
  Turno: number;
  Máquina: string;
  OP: number;
  "Todos os documentos estão na pasta?": string;
}

interface ProcessResult {
  success: number;
  errors: number;
  total: number;
}

export function ChecklistUpload(): JSX.Element {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const { toast } = useToast();

  const processChecklistData = useCallback(async (data: ChecklistData[]): Promise<ProcessResult> => {
    let success = 0;
    let errors = 0;
    const total = data.length;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      setUploadProgress(Math.round(((i + 1) / total) * 100));

      try {
        // Normalizar status - mapeia "OK" para "Sim" e outros valores para "Não"
        const normalizedStatus = item["Todos os documentos estão na pasta?"]?.toLowerCase() === "ok" 
          ? "Sim" 
          : item["Todos os documentos estão na pasta?"] || "Não";

        // Processar data - garantir formato correto
        let processedDate = item.Data;
        if (item.Data) {
          try {
            const date = new Date(item.Data);
            processedDate = format(date, "yyyy-MM-dd");
          } catch {
            processedDate = item.Data; // Manter original se não conseguir processar
          }
        }

        const processedItem = {
          Data: processedDate,
          Auditor: item.Auditor || null,
          Turno: item.Turno || null,
          Máquina: item.Máquina || null,
          OP: item.OP || null,
          "Todos os ocumento estão na pasta?": normalizedStatus, // Note: mantendo o nome da coluna original
        };

        const { error } = await supabase
          .from("Checklist - Antilhas")
          .insert(processedItem);

        if (error) {
          console.error("Erro ao inserir item:", error, processedItem);
          errors++;
        } else {
          success++;
        }
      } catch (error) {
        console.error("Erro ao processar item:", error, item);
        errors++;
      }
    }

    return { success, errors, total };
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setIsUploading(true);
    setUploadProgress(0);
    setResult(null);

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text) as ChecklistData[];

      if (!Array.isArray(jsonData)) {
        throw new Error("O arquivo deve conter um array de objetos JSON");
      }

      if (jsonData.length === 0) {
        throw new Error("O arquivo está vazio");
      }

      // Validar estrutura básica
      const requiredFields = ["Data", "Auditor", "Turno", "Máquina", "OP"];
      const firstItem = jsonData[0];
      const missingFields = requiredFields.filter(field => !(field in firstItem));
      
      if (missingFields.length > 0) {
        throw new Error(`Campos obrigatórios ausentes: ${missingFields.join(", ")}`);
      }

      const processResult = await processChecklistData(jsonData);
      setResult(processResult);

      if (processResult.success > 0) {
        toast({
          title: "Upload concluído!",
          description: `${processResult.success} de ${processResult.total} registros importados com sucesso.`,
          variant: processResult.errors > 0 ? "default" : "default",
        });
      }

      if (processResult.errors > 0) {
        toast({
          title: "Alguns erros ocorreram",
          description: `${processResult.errors} registros falharam na importação.`,
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error("Erro no upload:", error);
      toast({
        title: "Erro no upload",
        description: error instanceof Error ? error.message : "Erro desconhecido ao processar arquivo",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [processChecklistData, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    multiple: false,
    disabled: isUploading,
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload de Checklists
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
            ${isUploading ? 'cursor-not-allowed opacity-50' : 'hover:border-primary hover:bg-primary/5'}
          `}
        >
          <input {...getInputProps()} />
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-primary font-medium">Solte o arquivo aqui...</p>
          ) : (
            <div>
              <p className="font-medium mb-2">
                Arraste e solte seu arquivo JSON aqui ou clique para selecionar
              </p>
              <p className="text-sm text-muted-foreground">
                Apenas arquivos .json são aceitos
              </p>
            </div>
          )}
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Processando...</span>
              <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        {result && (
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <CheckCircle className="h-4 w-4" />
                <span className="font-semibold">{result.success}</span>
              </div>
              <p className="text-xs text-muted-foreground">Sucessos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
                <AlertCircle className="h-4 w-4" />
                <span className="font-semibold">{result.errors}</span>
              </div>
              <p className="text-xs text-muted-foreground">Erros</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-1">
                <FileText className="h-4 w-4" />
                <span className="font-semibold">{result.total}</span>
              </div>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded">
          <strong>Formato esperado:</strong> Array JSON com objetos contendo: Data, Auditor, Turno, Máquina, OP, "Todos os documentos estão na pasta?"
        </div>
      </CardContent>
    </Card>
  );
}