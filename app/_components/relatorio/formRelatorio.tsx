'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
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
import { Relatorio } from '@/lib/types'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  nomeCliente: z
    .string()
    .min(2, {
      message: 'Nome deve ter pelo menos 2 caracteres.',
    })
    .max(50),
  idSite: z.string(),
  altura: z.string().optional(),
  endereco: z.string(),
  bairro: z.string(),
  numero: z.string(),
  cidade: z.string(),
  uf: z.string(),
  tecnico: z.string(),
  dataServico: z.date({
    required_error: 'Uma data de serviço é obrigatória.',
  }),
  tipoSite: z.string(),
  tipoEstrutura: z.string(),
})

type FormValues = z.infer<typeof formSchema>

export default function FormRelatorio({ report }: { report?: Relatorio }) {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // nomeCliente: report ? report.nomeCliente : '',
      // idSite: report ? report.idSite : '',
      altura: report ? report.altura : '',
      endereco: report ? report.endereco : '',
      bairro: report ? report.bairro : '',
      numero: report ? report.numero : '',
      cidade: report ? report.cidade : '',
      uf: report ? report.uf : '',
      tecnico: report ? report.tecnico : '',
      // dataServico: report ? new Date(report.dataServico) : new Date(),
      // tipoSite: report ? report.tipoSite : '',
      // tipoEstrutura: report ? report.tipoEstrutura : '',
    },
  })

  function onSubmit(values: FormValues) {
    if (report) {
      console.log(values)
      // saveRelatorio({
      //   ...values,
      //   id: report.id,
      //   createdAt: report.createdAt,
      // })
      router.refresh()
    } else {
      // saveRelatorio({
      //   ...values,
      //   createdAt: new Date(),
      // })
      router.refresh()
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="nomeCliente"
                // defaultValue={relatorio?.nomeCliente}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome do Cliente"
                        {...field}
                        defaultValue={report?.clientId}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idSite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Site</FormLabel>
                    <FormControl>
                      <Input placeholder="BR50462-A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="altura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura</FormLabel>
                    <FormControl>
                      <Input placeholder="100m" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Bairro A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UF</FormLabel>
                    <FormControl>
                      <Input placeholder="SP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tecnico"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Técnico</FormLabel>
                    <FormControl>
                      <Input placeholder="João" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataServico"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-3">
                    <FormLabel>Data do Serviço</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>Informe a data</span>
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
              <FormField
                control={form.control}
                name="tipoSite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Site</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um Tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GREEN FIELD">GREEN FIELD</SelectItem>
                        <SelectItem value="ROOF TOP">ROOF TOP</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipoEstrutura"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Estrutura</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma estrutura" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TORRE METALICA">
                          TORRE METÁLICA
                        </SelectItem>
                        <SelectItem value="CAVALETE">CAVALETE</SelectItem>
                        <SelectItem value="SUPORTE">SUPORTE</SelectItem>
                        <SelectItem value="POSTE CONCRETO">
                          POSTE CONCRETO
                        </SelectItem>
                        <SelectItem value="POSTE METALICO">
                          POSTE METÁLICO
                        </SelectItem>
                        <SelectItem value="OUTROS">OUTROS</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Salvar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}
