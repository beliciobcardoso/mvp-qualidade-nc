'use client'
import LogoNC from '@/assets/ncLogo.png'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email({ message: 'Insira um email válido' }),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type FormValues = z.infer<typeof formSchema>

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: FormValues) {
    setError(null)

    signIn('credentials', {
      ...values,
      redirect: false,
    }).then((res) => {
      if (res && res.error === 'CredentialsSignin') {
        setError('Credenciais Inválidas')
      } else if (res && res.status === 200) {
        router.push('/')
        setError(null)
      }
    })
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-center bg-primary-500 rounded-full">
          <Image src={LogoNC} width={200} height={200} alt="Logo" />
        </div>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Insira seu email abaixo para fazer login na sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@novacorrente.ind.br"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="mt-8 text-center text-sm text-red-500">{error}</p>
            )}
            <Button className="w-full">Entrar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
