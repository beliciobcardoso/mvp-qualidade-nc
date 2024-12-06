'use client'
import DefaultUploadImage from '@/assets/image.svg'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type ClientSchema, clientSchema } from '@/lib/formValidationSchemas'
import type { dialogNewClientProps } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateClient, uploadClientLogo } from '../actions'

export function DialogClientUpdate({ dialogButton, dialogTitle, dialogDescription, dialogData }: dialogNewClientProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  async function submitForm(formData: FormData) {
    const clientId = dialogData?.id ?? ''
    const url = await uploadClientLogo(formData, clientId)

    if (url !== null) {
      setImageUrl(url)
    } else {
      setImageUrl('')
    }
  }

  const form = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
    values: {
      name: dialogData?.name ?? '',
      img: dialogData?.img ?? '',
    },
  })

  async function onSubmit(values: ClientSchema) {
    let img = DefaultUploadImage

    if (values.img === '' && imageUrl !== '') {
      img = imageUrl
    } else if (imageUrl === '' && values.img !== '') {
      img = values.img
    } else if (imageUrl !== '' && values.img !== '') {
      img = imageUrl
    }

    if (dialogData) {
      await updateClient({
        id: dialogData.id ?? '',
        name: values.name,
        img,
      })
      setImageUrl('')
      router.refresh()
      setOpen(false)
      form.reset()
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
        {dialogData?.img ? (
          <div className="flex justify-center">
            <Image src={dialogData?.img} alt="Imagem do cliente" width={100} height={100} />
          </div>
        ) : imageUrl ? (
          <div className="flex justify-center">
            <Image src={imageUrl} alt="Imagem do cliente" width={100} height={100} />
          </div>
        ) : (
          <div className="flex justify-center">
            <Image src={DefaultUploadImage} alt="Imagem do cliente" width={100} height={100} />
          </div>
        )}

        <div>
          <form action={submitForm} className="flex gap-2">
            <label htmlFor="file" className="dark:text-white"></label>
            <Input type="file" name="file" className="dark:text-white" placeholder="test" />
            <button
              type="submit"
              className="border-color-gray-700 rounded-md border-2 p-1 dark:bg-gray-700 dark:text-white"
            >
              upload
            </button>
          </form>
        </div>
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
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="hidden">Imagem</FormLabel>
                  <FormControl>
                    <Input placeholder="Imagem" {...field} className="hidden" />
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
