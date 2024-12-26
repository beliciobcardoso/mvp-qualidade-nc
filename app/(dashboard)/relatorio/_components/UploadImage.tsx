'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, RotateCcw, RotateCw } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import type { FileWithPath } from 'react-dropzone'
import { useDropzone } from "react-dropzone"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { deletePhoto, reduceImageSize, savePhotoAnalisys, teste, upLoadPhotoAnalisys } from '../actions'
import RichTextEditor from './textEditor/rich-text-editor'

interface ImageProcessingProps {
  width?: number;
  height?: number;
  quality?: number;
}


const formSchema = z.object({
  description: z.string().min(10, { message: 'A Descrição deve ter no mínimo 10 caracteres' }).trim(),
})

export function UploadImage() {
  const pathname = usePathname()
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const idReport = Number(pathname.split('/').pop())
  const router = useRouter()
  const [rotation, setRotation] = useState<number>(0)
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const processImage = (
    image: HTMLImageElement,
    { width = 400, height = 300, quality = 0.8 }: ImageProcessingProps = {}
  ): string => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width || image.width;
    canvas.height = height || image.height;

    ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", quality);
  };

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        const resizedImage = processImage(image);
        setProcessedImage(resizedImage);
      };
      image.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  });


  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    const binaryFile = await file.arrayBuffer()
    const imageReducer = await reduceImageSize(binaryFile, 300, 300)

  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const result = await teste(await file.arrayBuffer())
    }
  }

  async function submitForm(formData: FormData) {

    console.log('front', rotate)

    if (imageUrl !== '') {
      const result = await deletePhoto(imageUrl)

      if (result) {
        setImageUrl('')
      } else {
        console.log('Erro ao deletar imagem')
      }

    }

    const url = await upLoadPhotoAnalisys(formData, idReport, rotation)

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



  const rotate = (direction: 'left' | 'right') => {
    setRotation(prev => direction === 'left' ? prev - 90 : prev + 90)
  }

  return (
    <div className="flex flex-col items-center justify-start gap-2">

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-5 cursor-pointer
        hover:border-gray-400 transition-colors h-[350px] flex flex-col justify-center items-center"
      >
        <input {...getInputProps()} />
        {processedImage ? (
          <img
            src={processedImage}
            alt="Imagem processada"
            className="border border-gray-200 rounded-lg mx-auto"
          />
        ) : (
          <div className="w-32 h-24 bg-muted rounded-lg flex flex-col h-full items-center justify-center w-full">
            <ImagePlus className="w-8 h-8 text-muted-foreground" />
            <p>Arraste e solte sua imagem aqui, ou clique para selecionar</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => rotate('left')}
          disabled={!processedImage}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => rotate('right')}
          disabled={!processedImage}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
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
              <Button type="submit" disabled={!processedImage || !description}>
                Salvar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
