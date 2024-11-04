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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { siteSchema } from '@/lib/formValidationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSite } from '../actions'

import { DialogNewSiteProps } from '@/lib/types'
import { Site } from '@prisma/client'

export function DialogSite({
  dialogButton,
  dialogTitle,
  dialogDescription,
  structureData,
  siteTypeData,
  clientData,
}: DialogNewSiteProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<Site>({
    resolver: zodResolver(siteSchema),
    defaultValues: {
      idSite: '',
      altura: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      idClient: '',
      siteTypeId: 0,
      structureTypeId: 0,
    },
  })

  async function onSubmit(values: Site) {
    try {
      await createSite(values)
      router.refresh()
      setOpen(false)
      form.reset()
    } catch (error) {
      console.error(error)
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
        {
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="idClient"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cliente</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Escolha um Cliente" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {clientData?.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
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
                    name="idSite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ORIGINAL ID</FormLabel>
                        <FormControl>
                          <Input placeholder="ORIGINAL ID" {...field} />
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
                          <Input
                            placeholder="Altura"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="siteTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TIPO DE SITE</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Escolha" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {siteTypeData?.map((item) => (
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
                    name="structureTypeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TIPO DE ESTRUTURA</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {structureData?.map((item) => (
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
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="endereco"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input placeholder="Endereço" {...field} />
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
                          <Input placeholder="Número" {...field} />
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
                          <Input placeholder="Bairro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade" {...field} />
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
                          <Input placeholder="UF" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormMessage />
              <Button type="submit">Salvar</Button>
            </form>
          </Form>
        }
      </DialogContent>
    </Dialog>
  )
}