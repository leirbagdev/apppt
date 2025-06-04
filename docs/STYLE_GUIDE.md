# Guia de Estilo do APT-V0

## 📝 Princípios Gerais

1. **Clareza sobre Concisão**
   - Prefira código mais explícito e legível
   - Use nomes descritivos e significativos

2. **Consistência**
   - Siga os padrões estabelecidos
   - Use as mesmas convenções em todo o projeto

3. **Tipagem Forte**
   - Use TypeScript de forma efetiva
   - Evite \`any\` e tipagem implícita

## 🎨 Estilo de Código

### Nomenclatura

```typescript
// ✅ Componentes: PascalCase
const UserProfile = () => { }

// ✅ Hooks: camelCase com prefixo 'use'
const useUserData = () => { }

// ✅ Funções: camelCase, verbo + substantivo
const fetchUserData = () => { }

// ✅ Constantes: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3
```

### Tipos e Interfaces

```typescript
// ✅ Interfaces: prefixo 'I' para props de componentes
interface IUserProfileProps {
  userId: string
  isAdmin?: boolean
}

// ✅ Types: sufixo descritivo
type UserRole = 'admin' | 'trainer' | 'client'
```

### Componentes

```tsx
// ✅ Estrutura de componente
import { type FC } from 'react'
import styles from './Component.module.css'

interface IComponentProps {
  // props...
}

export const Component: FC<IComponentProps> = ({ prop1, prop2 }) => {
  // lógica...
  
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  )
}
```

### Hooks

```typescript
// ✅ Estrutura de hook customizado
export function useCustomHook(param: Type): ReturnType {
  // Estado no topo
  const [state, setState] = useState()
  
  // Refs depois do estado
  const ref = useRef()
  
  // Effects agrupados por funcionalidade
  useEffect(() => {
    // Lógica relacionada
  }, [dependencies])
  
  // Handlers e funções auxiliares
  const handleEvent = () => { }
  
  // Retorno explícito
  return {
    state,
    handleEvent
  }
}
```

## 📁 Estrutura de Arquivos

```
├── components/
│   ├── ComponentName/
│   │   ├── index.tsx
│   │   ├── ComponentName.module.css
│   │   └── ComponentName.test.tsx
│   └── ...
├── hooks/
│   ├── useHookName.ts
│   └── useHookName.test.ts
└── ...
```

## 🎭 Testes

```typescript
// ✅ Estrutura de teste
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Arrange
    const props = { }
    
    // Act
    render(<Component {...props} />)
    
    // Assert
    expect(screen.getByText('text')).toBeInTheDocument()
  })
})
```

## 🔄 Git

### Commits

```bash
# ✅ Formato de commit
type(scope): description

# Tipos:
- feat: nova funcionalidade
- fix: correção de bug
- docs: documentação
- style: formatação
- refactor: refatoração
- test: testes
- chore: manutenção
```

### Branches

```bash
# ✅ Formato de branch
type/description

# Exemplos:
- feature/user-profile
- fix/login-validation
- refactor/performance
```

## 🚀 Performance

- Use React.memo() com critério
- Implemente lazy loading quando apropriado
- Otimize re-renders com useMemo/useCallback
- Prefira CSS Modules para estilos

## 🛡️ Segurança

- Valide todas as entradas do usuário
- Use prepared statements para queries
- Implemente rate limiting
- Sanitize dados antes de renderizar

## 📦 Dependências

- Mantenha dependências atualizadas
- Evite dependências desnecessárias
- Use peerDependencies quando apropriado
- Documente requisitos específicos
