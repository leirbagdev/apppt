# appt for trainers

Plataforma para profissionais de educação física e personal trainers gerenciarem clientes, treinos, agenda e cobranças.

## Estrutura do Projeto

```
├── app/
│   ├── (landing)/           # Landing page pública
│   ├── (auth)/              # Login e cadastro
│   └── dashboard/           # Área logada principal
├── components/              # Componentes reutilizáveis
├── hooks/                   # React hooks personalizados
├── lib/                     # Supabase client, utils, validações
├── public/                  # Imagens, logos, etc
├── styles/                  # CSS global e tokens
├── .env.local               # Variáveis de ambiente (NÃO versionar)
├── next.config.mjs          # Configurações Next.js
├── tailwind.config.ts       # Tailwind CSS
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
```

## Instalação

1. Clone o repositório
2. Instale as dependências:
   ```
   pnpm install
   ```
3. Copie o arquivo `.env.local` de exemplo e preencha com suas chaves do Supabase:
   ```
   cp .env.local.example .env.local
   # Edite .env.local com suas credenciais
   ```
4. Rode o projeto:
   ```
   pnpm dev
   ```

## Scripts
- `pnpm dev` — inicia o servidor de desenvolvimento
- `pnpm build` — build de produção
- `pnpm start` — inicia o servidor em produção

## Tecnologias
- Next.js 13+
- React
- Tailwind CSS
- Supabase
- TypeScript

## Observações
- O arquivo `.env.local` **NÃO** deve ser versionado.
- Estrutura modular para facilitar manutenção e escalabilidade.

---

Desenvolvido por appt for trainers. 