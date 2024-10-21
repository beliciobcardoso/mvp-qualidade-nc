'use client'
import DefaultUploadImage from '@/assets/image.svg'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { savePhotoAnalisys, upLoadPhotoAnalisys } from '../actions'

const formSchema = z.object({
  description: z.string().min(2).max(200),
})

export function UploadImage() {
  const pathname = usePathname()
  const [isDragging, setIsDragging] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const idReport = Number(pathname.split('/').pop())
  const router = useRouter()

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
    defaultValues: {
      description: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const fileName = imageUrl.split('/').pop() as string
    const data = {
      idReport,
      url: imageUrl,
      name: fileName,
      description: values.description,
    }

    await savePhotoAnalisys(data)
    router.refresh()
    setImageUrl('')
    form.reset()
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-start">
      <div>
        <form action={submitForm}>
          <label htmlFor="file" className="dark:text-white"></label>
          <input type="file" name="file" className="dark:text-white" />
          <button
            type="submit"
            className="dark:bg-gray-700 dark:text-white border-color-gray-700 border-2 rounded-md p-1"
          >
            upload
          </button>
        </form>
      </div>
      <p className="text-sm dark:text-white">Or</p>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`bg-gray-50 dark:bg-gray-800 ${
          isDragging ? 'border-green' : 'border-light-blue'
        } border-2 border-dashed rounded-xl p-2 flex items-center flex-col w-full justify-center gap-2`}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="Uploaded image" width={300} height={300} />
        ) : (
          <Image
            src={DefaultUploadImage}
            alt="Upload image"
            width={300}
            height={300}
          />
        )}
        <p className="text-sm dark:text-white">
          {!isDragging && 'Arraste e solte sua imagem aqui'}
        </p>
      </div>

      <div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="Descrição"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={!imageUrl}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
