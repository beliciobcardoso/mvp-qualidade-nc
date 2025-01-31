import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { PhotoAnalisysType } from '@/lib/types'
import Image from 'next/image'

type PhotoCardProps = {
  imagem: PhotoAnalisysType
}

export default function PhotoCard({ imagem }: PhotoCardProps) {
  return (
    <Card className="group w-full">
      <CardHeader className="flex flex-row items-start justify-between gap-2 overflow-hidden p-4">
        <div className="flex flex-col items-center truncate">
          <div className="truncate">
            <CardTitle className="truncate text-lg font-bold">{imagem.name}</CardTitle>
          </div>
          <div className="flex">
            <Image src={imagem.url} alt={imagem.name} width={400} height={400} />
          </div>
          <CardDescription className="truncate text-sm text-gray-500">{imagem.description}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}
