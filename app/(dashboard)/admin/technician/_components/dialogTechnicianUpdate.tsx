'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type TechnicianSchema, clientSchema } from '@/lib/formValidationSchemas'
import type { dialogNewTechnicianProps } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateTechnician } from '../actions'

export function DialogTechnicianUpdate({
  dialogButton,
  dialogTitle,
  dialogDescription,
  dialogData,
}: dialogNewTechnicianProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<TechnicianSchema>({
    resolver: zodResolver(clientSchema),
    values: {
      name: dialogData?.name ?? '',
    },
  })

  async function onSubmit(values: TechnicianSchema) {
    if (dialogData) {
      await updateTechnician({
        id: dialogData.id ?? '',
        name: values.name,
      })
      router.refresh()
      setOpen(false)
      form.reset()
    }
  }

  const dialogStart = (sim: boolean) => {
    setOpen(sim)
    if (sim) {
      form.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => dialogStart(true)} variant="outline">
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
