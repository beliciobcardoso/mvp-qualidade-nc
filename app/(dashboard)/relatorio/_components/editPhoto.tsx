'use client'
import DefaultUploadImage from '@/assets/image.svg'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import type { PhotoAnalisysType } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { PenIcon } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { savePhotoAnalisys, upLoadPhotoAnalisys } from '../actions'
import RichTextEditor from './textEditor/rich-text-editor'

const formSchema = z.object({
  description: z.string().min(10, { message: 'A Descrição deve ter no mínimo 10 caracteres' }).trim(),
})

interface RemovePhotoProps {
  dialogTitle: string
  dialogDescription: string
  photoAnalisys: PhotoAnalisysType
  index: number
}

export default function EditPhoto({ dialogTitle, dialogDescription, photoAnalisys, index }: RemovePhotoProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const idReport = Number(pathname.split('/').pop())
  const [description, setDescription] = useState('')

  if (imageUrl === '') {
    setImageUrl(photoAnalisys.url)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(true)
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      await submitForm(formData)
    }
  }

  async function submitForm(formData: FormData) {
    const url = await upLoadPhotoAnalisys(formData, idReport)

    if (url !== null) {
      setImageUrl(url)
    } else {
      setImageUrl('')
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      description: photoAnalisys.description,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const fileName = imageUrl.split('/').pop() as string
    const data = {
      id: photoAnalisys.id,
      idReport,
      url: imageUrl,
      name: fileName,
      description: values.description,
    }

    await savePhotoAnalisys(data)
    setDescription('')
    router.refresh()
    setImageUrl('')
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} variant={'outline'}>
        <PenIcon className="cursor-pointer" size={24} />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <p>Deseja altera a foto de número {index} deste Relatório?</p>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`bg-gray-50 dark:bg-gray-800 ${isDragging ? 'border-green' : 'border-light-blue'
              } flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-2`}
          >
            {imageUrl ? (
              <Image src={imageUrl} alt="Uploaded image" width={300} height={300} />
            ) : (
              <Image src={DefaultUploadImage} alt="Upload image" width={300} height={300} />
            )}
            <p className="text-sm dark:text-white">{!isDragging && 'Arraste e solte sua imagem aqui'}</p>
          </div>
          <div>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RichTextEditor
                            content={field.value}
                            onChange={(value) => {
                              field.onChange(value)
                              setDescription(value)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Salvar</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
