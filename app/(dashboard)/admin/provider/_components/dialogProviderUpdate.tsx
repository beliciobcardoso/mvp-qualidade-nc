'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type ProviderSchema, providerSchema } from '@/lib/formValidationSchemas'
import type { DialogProps } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateProvider } from '../actions'
import type { Provider } from '@prisma/client'

type DialogUpdateProviderProps = {
  dialogProps: DialogProps
  provider: Provider
}

export function DialogProviderUpdate({ dialogProps, provider }: DialogUpdateProviderProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<ProviderSchema>({
    resolver: zodResolver(providerSchema),
    values: {
      name: provider?.name ?? ''
    },
  })

  async function onSubmit(values: ProviderSchema) {

    if (provider) {
      await updateProvider({
        id: provider.id ?? '',
        name: values.name,
      })
      router.refresh()
      setOpen(false)
      form.reset()
    }
  }

  const dialogStart = () => {
    setOpen(true)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => dialogStart()} variant="outline">
        {dialogProps.dialogButton}
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogProps.dialogTitle}</DialogTitle>
          <DialogDescription>{dialogProps.dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
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
