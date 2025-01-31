'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { type CheckInSchema, checkInSchema } from '@/lib/formValidationSchemas'
import type { DialogProps, User } from '@/lib/types'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { format } from 'date-fns'
import { Check, ChevronsUpDown, PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Provider } from '@prisma/client'
import { createCheckIn } from '../actions'

type DialogCheckInFormProps = {
  dialogProps: DialogProps,
  providerData: Provider[]
  dataUser?: User
}

export function DialogCheckInForm({
  dialogProps,
  dataUser,
  providerData
}: DialogCheckInFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openPopoverTechnician, setOpenPopoverTechnician] = useState(false)
  const [openPopoverSite, setOpenPopoverSite] = useState(false)
  const [openPopoverScopeService, setOpenPopoverScopeService] = useState(false)

  const form = useForm<CheckInSchema>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      providerId: '',
      dateCheckIn: new Date(),
    },
  })

  async function onSubmit(values: CheckInSchema) {
    const idUser = await dataUser?.id

    try {
      await createCheckIn({
        providerId: values.providerId,
        dateCheckIn: values.dateCheckIn,
        userId: idUser || '',
      })
      router.refresh()
      setOpen(false)
      form.reset()
    } catch (error) {
      console.error(error)
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
      <DialogContent className="sm:max-h-[500px] sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{dialogProps.dialogTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">


                <FormField
                  control={form.control}
                  name="providerId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-3">
                      <FormLabel className="sr-only">Fornecedor</FormLabel>
                      <Popover open={openPopoverTechnician} onOpenChange={setOpenPopoverTechnician}>
                        <PopoverTrigger asChild>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                // biome-ignore lint/a11y/useSemanticElements: <explanation>
                                role="combobox"
                                className={cn('w-[240px] justify-between', !field.value && 'text-muted-foreground')}
                              >
                                {field.value
                                  ? providerData?.find((provider) => provider.id === field.value)?.name
                                  : 'Escolha um Fornecedor'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                            <Link href="/admin/provider">
                              <PlusCircleIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Link>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar Técnico..." />
                            <CommandList>
                              <CommandEmpty>Nenhum Técnico encontrado.</CommandEmpty>
                              <CommandGroup>
                                {providerData?.map((provider) => (
                                  <CommandItem
                                    key={provider.id}
                                    value={provider.name}
                                    onSelect={() => {
                                      form.setValue('providerId', provider.id || '')
                                      setOpenPopoverTechnician(false)
                                    }}
                                  >
                                    {provider.name}
                                    <Check
                                      className={cn(
                                        'ml-auto',
                                        provider.name === field.value ? 'opacity-100' : 'opacity-0',
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateCheckIn"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-3">
                      <FormLabel className="sr-only">Data do Serviço</FormLabel>
                      <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Informa a data</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(value) => {
                              field.onChange(value)
                              setOpenCalendar(false)
                            }}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
