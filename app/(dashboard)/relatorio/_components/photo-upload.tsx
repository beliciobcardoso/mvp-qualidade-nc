'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImagePlus, RotateCcw, RotateCw } from 'lucide-react'
import { useState } from 'react'


export default function PhotoUpload() {
  const [image, setImage] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const rotate = (direction: 'left' | 'right') => {
    setRotation(prev => direction === 'left' ? prev - 90 : prev + 90)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Adicionar Foto</CardTitle>
        <p className="text-sm text-muted-foreground">Adicione uma nova foto</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <div
          className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          {image ? (
            <div className="relative aspect-[4/3] w-full">
              <img
                src={image}
                alt="Uploaded preview"
                className="object-contain w-full h-full"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center gap-2">
              <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                <ImagePlus className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Arraste e solte a imagem aqui ou click para inserir
              </p>
            </div>
          )}
          <input
            type="file"
            id="file-input"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => rotate('left')}
            disabled={!image}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => rotate('right')}
            disabled={!image}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="border rounded-md p-1">

        </div>

        <Button className="w-full bg-blue-400 hover:bg-blue-500">
          Salvar
        </Button>
      </CardContent>
    </Card>
  )
}

