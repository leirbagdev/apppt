# Apppt - Plataforma para Treinadores

## Visão Geral
Apppt é uma plataforma desenvolvida para treinadores gerenciarem seus alunos, acompanharem métricas de saúde e progresso, e oferecerem uma experiência personalizada. Este projeto utiliza tecnologias modernas como Next.js, Supabase e TailwindCSS.

## Funcionalidades
- **Landing Page**: Página inicial responsiva com navegação acessível e call-to-action para login.
- **Autenticação**: Login e cadastro com suporte a Google e Facebook.
- **Dashboard**: Gerenciamento de alunos, incluindo busca e filtros.
- **Internacionalização**: Suporte a múltiplos idiomas.

## Estrutura do Projeto
```
app/
  (auth)/
    login/
      page.tsx - Página de login e cadastro.
  dashboard/
    students/
      page.tsx - Lista de alunos com busca e detalhes.
components/
  ui/
    LanguageSelector.tsx - Componente para troca de idioma.
lib/
  supabaseClient.ts - Configuração do cliente Supabase.
tests/
  login.test.tsx - Testes para o fluxo de login.
```

## Tecnologias Utilizadas
- **Next.js**: Framework React para renderização do lado do servidor.
- **Supabase**: Backend como serviço para autenticação e banco de dados.
- **TailwindCSS**: Framework CSS para estilização.
- **Jest**: Framework de testes.

## Configuração do Ambiente
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

## Testes
Para executar os testes:
```bash
pnpm test
```

## Contribuição
Contribuições são bem-vindas! Siga os passos abaixo:
1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).