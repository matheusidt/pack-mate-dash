-- Habilitar RLS para a tabela "Checklist - Antilhas" e criar políticas de acesso
ALTER TABLE "Checklist - Antilhas" ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura para todos os usuários (dashboard interno)
CREATE POLICY "Allow read access to checklist antilhas" 
ON "Checklist - Antilhas" 
FOR SELECT 
USING (true);

-- Política para permitir inserção para todos os usuários
CREATE POLICY "Allow insert access to checklist antilhas" 
ON "Checklist - Antilhas" 
FOR INSERT 
WITH CHECK (true);

-- Política para permitir atualização para todos os usuários
CREATE POLICY "Allow update access to checklist antilhas" 
ON "Checklist - Antilhas" 
FOR UPDATE 
USING (true);

-- Política para permitir exclusão para todos os usuários
CREATE POLICY "Allow delete access to checklist antilhas" 
ON "Checklist - Antilhas" 
FOR DELETE 
USING (true);