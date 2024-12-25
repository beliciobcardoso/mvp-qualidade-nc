'use client'
import DefaultUploadImage from '@/assets/image.svg'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { rotateImaged } from '@/lib/rotateImage'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { deletePhoto, savePhotoAnalisys, upLoadPhotoAnalisys } from '../actions'
import RichTextEditor from './textEditor/rich-text-editor'


const formSchema = z.object({
  description: z.string().min(10, { message: 'A Descrição deve ter no mínimo 10 caracteres' }).trim(),
})

export function UploadImage() {
  const pathname = usePathname()
  const [isDragging, setIsDragging] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const idReport = Number(pathname.split('/').pop())
  const router = useRouter()
  const [rotate, setRotate] = useState<number>(0)
  const [imagemRotacionada, setImagemRotacionada] = useState<Buffer | null>(null);



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
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const binaryFile = await file.arrayBuffer();
          const rotateImage = rotateImaged(binaryFile, rotate);
          console.log(event.target.result as string);


          // setImageUrl(event.target.result as string);
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      // formData.append('file', file)
      // await submitForm(formData)
    }
  }

  async function submitForm(formData: FormData) {
    setRotate(Number(formData.get('rotate')))

    console.log('front', rotate)

    if (imageUrl !== '') {
      const result = await deletePhoto(imageUrl)

      if (result) {
        setImageUrl('')
      } else {
        console.log('Erro ao deletar imagem')
      }

    }

    const url = await upLoadPhotoAnalisys(formData, idReport, rotate)

    if (url !== null) {
      setImageUrl(url)
      router.refresh()
    } else {
      setImageUrl('')
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
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
    setDescription('')
    router.refresh()
    setImageUrl('')
    form.reset()
  }

  useEffect(() => {
    rotacionarImagem(rotate);
  }, [rotate]);

  const rotacionarImagem = async (rotate: number) => {
    // const imagemBuffer = await sharp(imageUrl)
    //   .rotate(rotate)
    //   .toFormat('jpeg')
    //   .toBuffer();

    // setImagemRotacionada(imagemBuffer);
  };


  return (
    <div className="flex flex-col items-center justify-start gap-2">
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData()
            const file = (e.target as HTMLFormElement).file.files[0]
            const rotate = (e.target as HTMLFormElement).rotate.value
            formData.append('file', file)
            formData.append('rotate', rotate)
            await submitForm(formData)
          }}
        >
          <label htmlFor="file" className="dark:text-white">
            <input type="file" name="file" className="dark:text-white" />
          </label>
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <label className="dark:text-white">
                <input type="radio" name="rotate" value="0" defaultChecked onChange={() => rotacionarImagem(0)} /> 0°
              </label>
              <label className="dark:text-white">
                <input type="radio" name="rotate" value="90" onChange={() => rotacionarImagem(90)} /> 90°
              </label>
              <label className="dark:text-white">
                <input type="radio" name="rotate" value="180" onChange={() => rotacionarImagem(180)} /> 180°
              </label>
              <label className="dark:text-white">
                <input type="radio" name="rotate" value="360" onChange={() => rotacionarImagem(360)} /> 360°
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="border-color-gray-700 rounded-md border-2 p-1 dark:bg-gray-700 dark:text-white"
              >
                upload
              </button>
            </div>
          </div>
        </form>
      </div>
      <p className="text-sm dark:text-white">Or</p>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`bg-gray-50 dark:bg-gray-800 ${isDragging ? 'border-green' : 'border-light-blue'
          } flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-2`}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="Uploaded image" width={400} height={400} />
        ) : (
          <Image src={DefaultUploadImage} alt="Upload image" width={400} height={400} />
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

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit" disabled={!imageUrl || !description}>
                Salvar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
