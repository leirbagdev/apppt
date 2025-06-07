import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import RegisterPage from "@/app/auth/register/page"
import { supabase } from "@/lib/supabase"

jest.mock("@/lib/supabase", () => ({
  supabase: {
    auth: { signUp: jest.fn() },
    from: jest.fn(() => ({ insert: jest.fn() })),
  },
}))

const mockPush = jest.fn()
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: mockPush }) }))

describe("RegisterPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("valida senhas diferentes", async () => {
    render(<RegisterPage />)
    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: "Teste" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "teste@email.com" } })
    fireEvent.change(screen.getByLabelText(/^senha$/i), { target: { value: "12345678" } })
    fireEvent.change(screen.getByLabelText(/confirmar senha/i), { target: { value: "diferente" } })
    fireEvent.click(screen.getByLabelText(/aceito os/i))
    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }))
    await waitFor(() => {
      expect(screen.getByText(/as senhas não coincidem/i)).toBeInTheDocument()
    })
  })

  it("valida aceite dos termos", async () => {
    render(<RegisterPage />)
    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: "Teste" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "teste@email.com" } })
    fireEvent.change(screen.getByLabelText(/^senha$/i), { target: { value: "12345678" } })
    fireEvent.change(screen.getByLabelText(/confirmar senha/i), { target: { value: "12345678" } })
    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }))
    await waitFor(() => {
      expect(screen.getByText(/você deve aceitar os termos/i)).toBeInTheDocument()
    })
  })

  it("cadastra cliente com sucesso", async () => {
    supabase.auth.signUp.mockResolvedValue({ data: { user: { id: "1" } }, error: null })
    supabase.from.mockReturnValue({ insert: jest.fn().mockResolvedValue({ error: null }) })
    render(<RegisterPage />)
    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: "Cliente" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "cliente@email.com" } })
    fireEvent.change(screen.getByLabelText(/^senha$/i), { target: { value: "12345678" } })
    fireEvent.change(screen.getByLabelText(/confirmar senha/i), { target: { value: "12345678" } })
    fireEvent.click(screen.getByLabelText(/aceito os/i))
    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }))
    await waitFor(() => {
      expect(screen.getByText(/conta criada com sucesso/i)).toBeInTheDocument()
      expect(mockPush).toHaveBeenCalledWith("/client")
    })
  })

  it("cadastra treinador com sucesso", async () => {
    supabase.auth.signUp.mockResolvedValue({ data: { user: { id: "2" } }, error: null })
    supabase.from.mockReturnValue({ insert: jest.fn().mockResolvedValue({ error: null }) })
    render(<RegisterPage />)
    fireEvent.click(screen.getByRole("button", { name: /treinador/i }))
    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: "Treinador" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "treinador@email.com" } })
    fireEvent.change(screen.getByLabelText(/^senha$/i), { target: { value: "12345678" } })
    fireEvent.change(screen.getByLabelText(/confirmar senha/i), { target: { value: "12345678" } })
    fireEvent.click(screen.getByLabelText(/aceito os/i))
    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }))
    await waitFor(() => {
      expect(screen.getByText(/conta criada com sucesso/i)).toBeInTheDocument()
      expect(mockPush).toHaveBeenCalledWith("/dashboard")
    })
  })

  it("exibe erro do supabase", async () => {
    supabase.auth.signUp.mockResolvedValue({ data: {}, error: { message: "Erro de cadastro" } })
    render(<RegisterPage />)
    fireEvent.change(screen.getByLabelText(/nome completo/i), { target: { value: "Teste" } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "teste@email.com" } })
    fireEvent.change(screen.getByLabelText(/^senha$/i), { target: { value: "12345678" } })
    fireEvent.change(screen.getByLabelText(/confirmar senha/i), { target: { value: "12345678" } })
    fireEvent.click(screen.getByLabelText(/aceito os/i))
    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }))
    await waitFor(() => {
      expect(screen.getByText(/erro ao criar conta/i)).toBeInTheDocument()
    })
  })
})
