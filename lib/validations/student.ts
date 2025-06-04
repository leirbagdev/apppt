import { z } from "zod"

export const studentSchema = z.object({
  full_name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  birth_date: z.string().min(1, "Data de nascimento é obrigatória"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  secondary_phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  emergency_contact: z.string().min(2, "Contato de emergência é obrigatório"),
  emergency_phone: z.string().min(10, "Telefone de emergência é obrigatório"),
  height: z.number().min(100, "Altura deve ser maior que 100cm"),
  weight: z.number().min(30, "Peso deve ser maior que 30kg"),
  body_fat: z.number().optional(),
  objectives: z.array(z.string()).min(1, "Selecione pelo menos um objetivo"),
  medical_restrictions: z.string().optional(),
  medications: z.string().optional(),
  injuries: z.string().optional(),
  experience_level: z.enum(["iniciante", "intermediario", "avancado", "atleta"]),
  wearable_device: z.string().optional(),
  wearable_id: z.string().optional(),
  plan: z.enum(["basic", "standard", "premium", "vip"]),
  frequency: z.number().min(1).max(7),
  start_date: z.string().min(1, "Data de início é obrigatória"),
  payment_method: z.enum(["credit", "debit", "pix", "transfer", "cash"]),
  observations: z.string().optional(),
  status: z.enum(["active", "pending", "inactive"]).default("pending"),
})

export type StudentFormData = z.infer<typeof studentSchema>
