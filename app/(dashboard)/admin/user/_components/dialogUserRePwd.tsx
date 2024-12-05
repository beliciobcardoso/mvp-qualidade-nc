'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type UserRePwdSchema, userRePwdSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updatePassword } from '../actions'

type UserRePwdProps = {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  UserId: string | null
}

export function DialogUserRePwd({ dialogButton, dialogTitle, dialogDescription, UserId }: UserRePwdProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<UserRePwdSchema>({
    resolver: zodResolver(userRePwdSchema),
    values: {
      passwordHash: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: UserRePwdSchema) {
    if (UserId) {
      await updatePassword({
        id: UserId,
        passwordHash: values.passwordHash,
      })
      router.refresh()
      setOpen(false)
      form.reset()
    } else {
      router.refresh()
      setOpen(false)
      form.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} variant="outline">
        {dialogButton}
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="passwordHash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
