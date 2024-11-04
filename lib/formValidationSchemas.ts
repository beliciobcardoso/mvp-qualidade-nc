import { z } from 'zod'

export const userSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(3, {
      message: 'Nome de usuário deve ter pelo menos 3 caracteres.',
    }),
    email: z.string().email(),
    role: z.enum(['ADMIN', 'USER', 'ANALYST', 'TECHNICIAN', 'COORDINATOR']),
    passwordHash: z.string().min(8, {
      message: 'A senha deve ter pelo menos 8 caracteres.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'A senha deve ter pelo menos 8 caracteres.',
    }),
  })
  .refine((data) => data.passwordHash === data.confirmPassword, {
    message: 'As senhas devem ser iguais.',
    path: ['confirmPassword'],
  })

export type UserSchema = z.infer<typeof userSchema>

export const userUpdateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, {
    message: 'Nome de usuário deve ter pelo menos 3 caracteres.',
  }),
  email: z.string().email(),
  role: z.enum(['ADMIN', 'USER', 'ANALYST', 'TECHNICIAN', 'COORDINATOR']),
})

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>

export const siteSchema = z.object({
  id: z.number().optional(),
  idSite: z.string().min(5, { message: 'ID do Site é obrigatório.' }),
  altura: z.string().optional(),
  endereco: z.string().min(3, { message: 'Endereço é obrigatório.' }),
  bairro: z.string().min(3, { message: 'Bairro é obrigatório.' }),
  numero: z.string().min(1, { message: 'Número é obrigatório.' }),
  cidade: z.string().min(3, { message: 'Cidade é obrigatório.' }),
  uf: z.string().min(2, { message: 'UF é obrigatório.' }),
  idClient: z.string().min(1, { message: 'Cliente é obrigatório.' }),
  structureTypeId: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number(),
  ),
  siteTypeId: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number(),
  ),
})

export type SiteSchema = z.infer<typeof siteSchema>
