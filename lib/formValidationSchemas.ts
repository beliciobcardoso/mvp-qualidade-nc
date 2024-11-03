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
