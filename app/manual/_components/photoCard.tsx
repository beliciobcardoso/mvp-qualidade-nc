import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Photo } from '@/lib/types'
import Image from 'next/image'

type PhotoCardProps = {
  imagem: Photo
}

export default function PhotoCard({ imagem }: PhotoCardProps) {
  return (
    <Card className="w-full group">
      <CardHeader className="flex items-start justify-between p-4 flex-row overflow-hidden gap-2">
        <div className="flex flex-col items-center truncate">
          <div className="truncate">
            <CardTitle className="text-lg font-bold truncate">
              {imagem.title}
            </CardTitle>
          </div>
          <div className="flex">
            <Image
              src={imagem.url}
              alt={imagem.title}
              width={200}
              height={200}
            />
          </div>
          <CardDescription className="text-sm text-gray-500 truncate">
            {imagem.description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}
