'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { reportSchema } from '@/lib/formValidationSchemas'
import type { DialogReportProps, ReportType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'

import { format } from 'date-fns'
import { PlusCircleIcon } from 'lucide-react'
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

  const form = useForm<ReportCustomType>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      siteId: 0,
      technicianId: '',
    },
  })

  async function onSubmit(values: ReportType) {
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
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={String(field.value)}
                      >
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Escolha um Cliente" />
                            </SelectTrigger>
                          </FormControl>
                          <Link href="/admin/site">
                            <PlusCircleIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Link>
                        </div>
                        <SelectContent>
                          {siteData?.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.idSite}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Escolha um Técnico" />
                            </SelectTrigger>
                          </FormControl>
                          <Link href="/admin/technician">
                            <PlusCircleIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Link>
                        </div>
                        <SelectContent>
                          {technicianData?.map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateService"
                  render={({ field }) => (
                    <FormItem className="flex flex-col pt-3">
                      <FormLabel>Data do Serviço</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
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
                            onSelect={field.onChange}
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
