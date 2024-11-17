'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ReportSchema, reportSchema } from '@/lib/formValidationSchemas'
import { DialogReportProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateReport } from '../actions'

export function DialogRelatorio({
  dialogButton,
  dialogTitle,
  dialogDescription,
  report,
  siteData,
  technicianData,
}: DialogReportProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<ReportSchema>({
    resolver: zodResolver(reportSchema),
    values: {
      clientId: report?.clientId || '',
      siteId: report?.sites.id || 0,
      technicianId: report?.technicianId || '',
      dateService: report?.dateService || new Date(),
    },
  })

  async function onSubmit(values: ReportSchema) {
    const clientId = siteData?.find((site) => site.id === values.siteId)?.client
      .id

    if (clientId) {
      values.clientId = clientId
    }

    if (report?.id) {
      await updateReport({
        id: report?.id,
        siteId: values.siteId,
        clientId: values.clientId,
        technicianId: values.technicianId,
        dateService: values.dateService,
        createdAt: report?.createdAt,
        updatedAt: report?.updatedAt,
        finishedAt: report?.finishedAt,
        userId: report?.user.id,
      })
      router.refresh()
      setOpen(false)
      form.reset()
    } else {
      console.error('Client not found')
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

      <DialogContent className="sm:max-h-[600px] sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-1">
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
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um Cliente" />
                        </SelectTrigger>
                      </FormControl>
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
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <Input {...field} className="hidden" />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um Técnico" />
                        </SelectTrigger>
                      </FormControl>
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
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>Informa a data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
