import { createBrowserClient, createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

// Definição de tipos para o banco de dados
export type Database = {
  public: {
    Tables: {
      students: {
        Row: {
          id: number
          name: string
          email: string
          phone: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          email: string
          phone?: string
          status?: string
        }
        Update: {
          name?: string
          email?: string
          phone?: string
          status?: string
        }
      }
      // Outras tabelas aqui
    }
  }
}

// Dados mockados para uso quando não há conexão com Supabase
const mockData = {
  students: [
    {
      id: 1,
      name: "Leandro Silva",
      email: "leandrossilva@gmail.com",
      phone: "(11) 98765-4321",
      status: "active",
      created_at: "2023-01-15T10:30:00Z",
      updated_at: "2023-01-15T10:30:00Z",
    },
    {
      id: 2,
      name: "Marina Oliveira",
      email: "marina.oliveira@gmail.com",
      phone: "(21) 99876-5432",
      status: "active",
      created_at: "2023-02-20T14:45:00Z",
      updated_at: "2023-02-20T14:45:00Z",
    },
    {
      id: 3,
      name: "Carlos Mendes",
      email: "carlos.mendes@outlook.com",
      phone: "(31) 97654-3210",
      status: "inactive",
      created_at: "2023-03-10T09:15:00Z",
      updated_at: "2023-03-10T09:15:00Z",
    },
  ],
}

// Verificar se estamos em ambiente de desenvolvimento
const isDevelopment = process.env.NODE_ENV === "development" || typeof window === "undefined"

// Verificar se temos as variáveis de ambiente necessárias
const hasValidConfig =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("https://") &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Determinar se devemos usar o modo mock
export const useMockMode = !hasValidConfig

// Export isDemoMode as an alias for useMockMode for compatibility
export const isDemoMode = useMockMode

// Cliente Supabase para o navegador - único cliente necessário agora que temos o middleware
export const createClient = () => {
  if (useMockMode) return createMockClient()
  
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Função para criar um cliente mock que simula as operações do Supabase
function createMockClient() {
  console.log("🚧 Usando cliente Supabase em modo mock")

  // Implementação mock das funções do Supabase
  return {
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          single: () =>
            Promise.resolve({
              data: mockData[table as keyof typeof mockData]?.find((item: any) => item[column] === value),
              error: null,
            }),
          order: () => ({
            range: () => Promise.resolve({ data: mockData[table as keyof typeof mockData], error: null }),
          }),
        }),
        order: () => ({
          range: () => Promise.resolve({ data: mockData[table as keyof typeof mockData], error: null }),
        }),
      }),
      insert: (data: any) => {
        const newId = Math.max(...mockData[table as keyof typeof mockData].map((item: any) => item.id)) + 1
        const newItem = {
          id: newId,
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        mockData[table as keyof typeof mockData].push(newItem)
        return Promise.resolve({ data: newItem, error: null })
      },
      update: (data: any) => ({
        eq: (column: string, value: any) => {
          const index = mockData[table as keyof typeof mockData].findIndex((item: any) => item[column] === value)
          if (index !== -1) {
            mockData[table as keyof typeof mockData][index] = {
              ...mockData[table as keyof typeof mockData][index],
              ...data,
              updated_at: new Date().toISOString(),
            }
            return Promise.resolve({ data: mockData[table as keyof typeof mockData][index], error: null })
          }
          return Promise.resolve({ data: null, error: { message: "Item not found" } })
        },
      }),
      delete: () => ({
        eq: (column: string, value: any) => {
          const index = mockData[table as keyof typeof mockData].findIndex((item: any) => item[column] === value)
          if (index !== -1) {
            const deletedItem = mockData[table as keyof typeof mockData][index]
            mockData[table as keyof typeof mockData].splice(index, 1)
            return Promise.resolve({ data: deletedItem, error: null })
          }
          return Promise.resolve({ data: null, error: { message: "Item not found" } })
        },
      }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: { path: "mock-path" }, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "/placeholder.svg?height=100&width=100" } }),
      }),
    },
  } as any
}
