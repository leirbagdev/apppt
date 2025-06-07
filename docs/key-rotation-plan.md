# Plano de Rotação de Chaves do Supabase

## Cronograma de Rotação

- Chaves de serviço (SUPABASE_SERVICE_ROLE_KEY): A cada 90 dias
- Chaves anônimas (NEXT_PUBLIC_SUPABASE_ANON_KEY): A cada 180 dias

## Procedimento de Rotação

### Pré-requisitos
1. Acesso administrativo ao projeto Supabase
2. Acesso ao ambiente de produção
3. Janela de manutenção agendada (preferencialmente em horário de baixo tráfego)

### Passos para Rotação

1. **Backup das Chaves Atuais**
   ```bash
   # Criar backup do .env.local
   cp .env.local .env.backup-$(date +%Y%m%d)
   ```

2. **Gerar Novas Chaves**
   - Acesse o dashboard do Supabase
   - Vá para Project Settings > API
   - Gere novas chaves de serviço/anônimas

3. **Atualizar Ambientes**
   - Desenvolvimento: Atualizar .env.local
   - Staging: Atualizar variáveis de ambiente
   - Produção: Atualizar variáveis de ambiente

4. **Teste de Validação**
   - Executar testes automatizados
   - Verificar autenticação
   - Verificar operações CRUD
   - Verificar funções serverless

5. **Período de Graça**
   - Manter chaves antigas ativas por 24 horas
   - Monitorar logs de erro
   - Estar preparado para rollback

6. **Finalização**
   - Desativar chaves antigas
   - Documentar a rotação
   - Agendar próxima rotação

### Procedimento de Emergência

Em caso de comprometimento de chaves:
1. Gerar novas chaves imediatamente
2. Revogar chaves antigas
3. Atualizar todos os ambientes
4. Notificar equipe de segurança
5. Investigar possível comprometimento

## Contatos

- Administrador Supabase: [NOME] (email/telefone)
- DevOps: [NOME] (email/telefone)
- Segurança: [NOME] (email/telefone)
