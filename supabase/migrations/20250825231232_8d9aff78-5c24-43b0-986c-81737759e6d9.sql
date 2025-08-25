-- Habilitar realtime para a tabela "Checklist - Antilhas"
ALTER TABLE "Checklist - Antilhas" REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE "Checklist - Antilhas";