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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type CheckInSchema, checkInSchema } from '@/lib/formValidationSchemas'
import type { CheckInType, DialogProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Provider } from '@prisma/client'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateCheckIn } from '../actions'

type DialogCheckInUpdateProps = {
  dialogProps: DialogProps,
  checkInData: CheckInType
  providerData: Provider[]
}

export function DialogCheckInUpdate({
  dialogProps,
  checkInData,
  providerData
}: DialogCheckInUpdateProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)

  const form = useForm<CheckInSchema>({
    resolver: zodResolver(checkInSchema),
    values: {
      providerId: checkInData.providerId,
      dateCheckIn: checkInData.dateCheckIn,
    },
  })

  async function onSubmit(values: CheckInSchema) {
    console.log('Form values', values)

    try {
      await updateCheckIn({
        id: checkInData.id || 0,
        providerId: values.providerId,
        dateCheckIn: values.dateCheckIn,
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
      <Button
        className="w-full justify-start rounded-sm border-0 bg-inherit pl-2 font-normal text-black shadow-none transition-colors hover:bg-accent hover:shadow-none"
        onClick={() => dialogStart()}
      >
        {dialogProps.dialogButton}
      </Button>

      <DialogContent className="sm:max-h-[600px] sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{dialogProps.dialogTitle}</DialogTitle>
          <DialogDescription>{dialogProps.dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="providerId"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-3">
                    <FormLabel className="sr-only">Fornecedor</FormLabel>
                    <Select onValueChange={(value) => field.onChange(value)} defaultValue={String(field.value)}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um Fornecedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {providerData?.map((item) => (
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
                          lang='pt-BR'
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
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
