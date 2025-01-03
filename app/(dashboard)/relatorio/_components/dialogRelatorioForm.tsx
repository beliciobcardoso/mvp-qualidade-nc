'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { type ReportSchema, reportSchema } from '@/lib/formValidationSchemas'
import type { DialogReportProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { format } from 'date-fns'
import { Check, ChevronsUpDown, PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createReport } from '../actions'

type ReportCustomType = {
  siteId: number
  technicianId: string
  dateService: Date
}

export function DialogRelatorioForm({
  dialogButton,
  dialogTitle,
  dataUser,
  technicianData,
  siteData,
}: DialogReportProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openPopoverTechnician, setOpenPopoverTechnician] = useState(false)

  const form = useForm<ReportSchema>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      siteId: 0,
      technicianId: '',
    },
  })

  async function onSubmit(values: ReportSchema) {
    const idUser = await dataUser?.id

    try {
      await createReport({
        siteId: values.siteId,
        technicianId: values.technicianId,
        dateService: values.dateService,
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
        {dialogButton}
      </Button>
      <DialogContent className="sm:max-h-[400px] sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="siteId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Site</FormLabel>
                      <Popover open={openPopover} onOpenChange={setOpenPopover}>
                        <PopoverTrigger asChild>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Button
                                type='button'
                                variant="outline"
                                // biome-ignore lint/a11y/useSemanticElements: <explanation>
                                role="combobox"
                                className={cn(
                                  'w-[240px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value
                                  ? siteData?.find((site) => site.id === field.value)?.idSite
                                  : 'Escolha um Site'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                            <Link href="/admin/site">
                              <PlusCircleIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Link>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Buscar site..." />
                            <CommandList>
                              <CommandEmpty>Nenhum site encontrado.</CommandEmpty>
                              <CommandGroup>
                                {siteData?.map((site) => (
                                  <CommandItem
                                    key={site.id}
                                    value={site.idSite}
                                    onSelect={() => {
                                      form.setValue("siteId", site.id)
                                      setOpenPopover(false)
                                    }}
                                  >
                                    {site.idSite}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        site.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
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
                  name="technicianId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Técnico</FormLabel>
                      <Popover open={openPopoverTechnician} onOpenChange={setOpenPopoverTechnician}>
                        <PopoverTrigger asChild>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Button
                                type='button'
                                variant="outline"
                                // biome-ignore lint/a11y/useSemanticElements: <explanation>
                                role="combobox"
                                className={cn(
                                  'w-[240px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value
                                  ? technicianData?.find((technician) => technician.id === field.value)?.name
                                  : 'Escolha um Técnico'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                            <Link href="/admin/technician">
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
                                {technicianData?.map((technician) => (
                                  <CommandItem
                                    key={technician.id}
                                    value={technician.name}
                                    onSelect={() => {
                                      form.setValue("technicianId", technician.id || '')
                                      setOpenPopoverTechnician(false)
                                    }}
                                  >
                                    {technician.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        technician.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
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
                  name="dateService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data do Serviço</FormLabel>
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
