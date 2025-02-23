'use client'
import imagem from '@/assets/image.svg'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { PhotoAnalisysType, Relatorio } from '@/lib/types'
import Image from 'next/image'
import PhotoCard from './photo/photoCard'

interface PhotoAnalisysProps {
  photoAnalisys: PhotoAnalisysType[]
  relatorioFinished: Relatorio
}

export default function PhotoAnalisys({ photoAnalisys, relatorioFinished }: PhotoAnalisysProps) {
  return (
    <>
      {photoAnalisys.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {photoAnalisys.map((item, index) => (
            <PhotoCard key={item.id} photo={item} index={index + 1} relatorioFinished={relatorioFinished} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Array.from({ length: 3 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Card key={index}>
              <div className="flex flex-col items-center truncate">
                <CardContent className="w-[430px] pt-2">
                  <Image src={imagem} alt="Imagem" width={400} height={400} />
                </CardContent>
                <CardFooter className="mb-2 grid w-full grid-flow-col p-0">
                  <div className="col-span-1 ml-2 border-2 py-1 text-center font-bold">
                    <p>{index + 1}</p>
                  </div>
                  <div className="col-span-6 mr-2 flex h-9 items-center justify-center border-y-2 border-r-2 font-bold">
                    <p>Descrição da foto {index + 1}</p>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
