'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { clientSchema, ClientSchema } from '@/lib/formValidationSchemas'
import { ClientType, DialogNewProps } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createClient } from '../actions'

export function DialogClient({
  dialogButton,
  dialogTitle,
  dialogDescription,
}: DialogNewProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: ClientType) {
    try {
      await createClient(values)
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
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Cliente" {...field} />
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
