# APT - Plataforma de Treinos

## Descrição
Plataforma de gestão de treinos para treinadores e clientes, com autenticação, cadastro, dashboards e integração com Supabase.

## Funcionalidades
- Cadastro e login de clientes e treinadores
- Redirecionamento automático conforme tipo de usuário
- Cadastro seguro com validação de senha e aceite de termos
- Feedback visual com toasts para erros e sucesso
- Páginas de Termos de Uso e Política de Privacidade
- Estrutura modular e responsiva com Next.js e Tailwind CSS

## Instalação
1. Clone o repositório
2. Instale as dependências:
   ```sh
   pnpm install
   # ou npm install
   ```
3. Configure as variáveis de ambiente do Supabase em `.env.local`
4. Execute o projeto:
   ```sh
   pnpm dev
   # ou npm run dev
   ```

## Testes
Execute os testes automatizados:
```sh
pnpm test
# ou npm run test
```

## Estrutura de Pastas
- `app/` - Páginas e rotas
- `components/` - Componentes reutilizáveis
- `hooks/` - Hooks customizados
- `lib/` - Configurações e utilitários
- `__tests__/` - Testes automatizados

## Segurança
- As regras de acesso do Supabase devem garantir que cada usuário só acesse seus próprios dados.
- Nunca exponha chaves secretas no frontend.

## Customização
- Adicione campos obrigatórios no cadastro conforme sua necessidade.
- Edite as páginas de Termos e Política em `app/termos/page.tsx` e `app/politica-de-privacidade/page.tsx`.

## Contribuição
Pull requests são bem-vindos!

## Licença
[MIT](LICENSE)
