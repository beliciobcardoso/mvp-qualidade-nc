import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

interface PhotoProps {
  id: number
  title: string
  url: string
  description: string
}

type PhotoCardProps = {
  photo: PhotoProps
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <Card className="w-full group">
      <CardHeader className="flex items-start justify-between p-4 flex-row overflow-hidden gap-2">
        <div className="flex flex-col items-center truncate">
          <div className="truncate">
            <CardTitle className="text-lg font-bold truncate">
              {photo.title}
            </CardTitle>
          </div>
          <div className="flex">
            <Image src={photo.url} alt={photo.title} width={200} height={200} />
          </div>
          <CardDescription className="text-sm text-gray-500 truncate">
            {photo.description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}
