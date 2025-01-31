'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { providerSchema, type ProviderSchema } from '@/lib/formValidationSchemas'
import type { DialogProps } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createProvider } from '../actions'

type DialogNewProviderProps = {
  dialogProps: DialogProps
}

export function DialogProvider({ dialogProps }: DialogNewProviderProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<ProviderSchema>({
    resolver: zodResolver(providerSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: ProviderSchema) {
    try {
      await createProvider({
        id: '',
        name: values.name,
      })
      router.refresh()
      setOpen(false)
      form.reset()
    } catch (error) {
      console.log(error)
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
        {
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fornecedor</FormLabel>
                    <FormControl>
                      <Input placeholder="Fornecedor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormMessage />
              <Button type="submit">Salvar</Button>
            </form>
          </Form>
        }
      </DialogContent>
    </Dialog>
  )
}
