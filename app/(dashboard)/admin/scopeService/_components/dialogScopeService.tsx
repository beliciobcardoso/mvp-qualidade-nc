'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type ScopeServiceSchema, scopeServiceSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createScopeService } from '../actions'


type TypeScopeService = {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
}

export function DialogScopeService({ dialogButton, dialogTitle, dialogDescription }: TypeScopeService) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<ScopeServiceSchema>({
    resolver: zodResolver(scopeServiceSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: ScopeServiceSchema) {
    await createScopeService({
      name: values.name,
    })
    router.refresh()
    setOpen(false)
    form.reset()
  }

  const dialogStart = () => {
    setOpen(true)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => dialogStart()} variant="outline">
        {dialogButton}
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Escopo do Serviço</FormLabel>
                    <FormControl>
                      <Input placeholder="Escopo do Serviço" {...field} />
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
