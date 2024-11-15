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
import {
  structureTypeSchema,
  StructureTypeSchema,
} from '@/lib/formValidationSchemas'
import { DialogNewProps, StructureTypeType } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createStructureType } from '../actions'

export function DialogStructureType({
  dialogButton,
  dialogTitle,
  dialogDescription,
}: DialogNewProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<StructureTypeSchema>({
    resolver: zodResolver(structureTypeSchema),
    defaultValues: {
      name: '',
    },
  })

  async function onSubmit(values: StructureTypeType) {
    await createStructureType({
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
                    <FormLabel>Tipo de Estrutura</FormLabel>
                    <FormControl>
                      <Input placeholder="Tipo de Estrutura" {...field} />
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
