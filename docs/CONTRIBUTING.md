# Guia de Contribuição

## 🌟 Como Contribuir

Agradecemos seu interesse em contribuir com o APT-V0! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Processo de Contribuição

1. **Fork o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/apt-v0.git
   cd apt-v0
   ```

2. **Instale as Dependências**
   ```bash
   pnpm install
   ```

3. **Crie uma Branch**
   ```bash
   git checkout -b feature/sua-feature
   ```

4. **Desenvolva!**
   - Siga o guia de estilo
   - Adicione testes para novas funcionalidades
   - Mantenha a documentação atualizada

5. **Teste suas Mudanças**
   ```bash
   pnpm test
   pnpm lint
   ```

6. **Commit suas Mudanças**
   ```bash
   git commit -m "feat: adiciona nova funcionalidade"
   ```

7. **Push para seu Fork**
   ```bash
   git push origin feature/sua-feature
   ```

8. **Abra um Pull Request**

## ✅ Checklist do Pull Request

- [ ] Código segue o guia de estilo
- [ ] Testes foram adicionados/atualizados
- [ ] Documentação foi atualizada
- [ ] Commit messages seguem a convenção
- [ ] Todas as verificações estão passando

## 🎯 Áreas para Contribuição

- **Bugs**: Corrija bugs reportados nas issues
- **Features**: Implemente novas funcionalidades
- **Documentação**: Melhore ou adicione documentação
- **Testes**: Aumente a cobertura de testes
- **Performance**: Otimize o código existente

## 📝 Diretrizes de Código

- Use TypeScript
- Mantenha componentes pequenos e focados
- Escreva testes para novas funcionalidades
- Documente APIs públicas
- Siga os princípios SOLID

## 🧪 Testes

- Escreva testes unitários para utils
- Testes de integração para componentes
- Testes e2e para fluxos críticos
- Mantenha cobertura acima de 80%

## 📚 Documentação

- Atualize o README quando necessário
- Documente novas funcionalidades
- Mantenha exemplos atualizados
- Adicione comentários em código complexo

## ⚠️ O que Evitar

- Breaking changes sem discussão
- Código não testado
- Dependências desnecessárias
- Alterações de estilo em arquivos não relacionados

## 🤝 Código de Conduta

- Seja respeitoso e profissional
- Aceite feedback construtivo
- Colabore de forma positiva
- Mantenha discussões focadas no código

## 🔄 Processo de Review

1. **Verificação Automática**
   - Lint passa
   - Testes passam
   - Build sucede

2. **Review Manual**
   - Código segue padrões
   - Funcionalidade atende requisitos
   - Documentação adequada

3. **Feedback**
   - Seja construtivo
   - Forneça exemplos
   - Explique o raciocínio

4. **Iteração**
   - Aplique feedback recebido
   - Atualize o PR
   - Responda comentários

## 📈 Melhores Práticas

- Mantenha PRs pequenos e focados
- Atualize sua branch regularmente
- Escreva mensagens de commit claras
- Documente decisões importantes

## 🙏 Agradecimentos

Sua contribuição é muito importante para o projeto! Agradecemos seu tempo e esforço em ajudar a melhorar o APT-V0.
