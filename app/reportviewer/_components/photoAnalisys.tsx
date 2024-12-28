'use client'
import imagem from '@/assets/image.svg'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { PhotoAnalisysType } from '@/lib/types'
import Image from 'next/image'

export default function PhotoAnalisys({
  photoAnalisys,
}: {
  photoAnalisys: PhotoAnalisysType[]
}) {
  return (
    <>
      {photoAnalisys.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {photoAnalisys.map((item, index) => (
            <Card key={item.id}>
              <div className="flex h-full flex-col items-center justify-between truncate">
                <CardContent className="w-[378px] p-0 pt-2 flex justify-center">
                  <Image src={item.url} alt="Imagem" width={300} height={300} />
                </CardContent>
                <CardFooter className="mb-2 flex justify-center max-h-20 w-full p-2">
                  <div className="flex h-full items-center justify-center border-2 py-1 font-bold">
                    <p className="text-center w-11">{index + 1}</p>
                  </div>
                  <div className="h-full p-2 font-bold  border-2 border-l-0">
                    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                    <div dangerouslySetInnerHTML={{ __html: item.description }}
                      className="w-72 max-h-14 text-wrap" />
                  </div>
                </CardFooter>
              </div>
            </Card>
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
