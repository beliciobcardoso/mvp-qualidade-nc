import imagem from '@/assets/image.svg'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { PhotoAnalisysType } from '@/lib/types'
import Image from 'next/image'

export default function PhotoAnalisys({
  photoAnalisys,
}: {
  photoAnalisys: PhotoAnalisysType[]
}) {
  return (
    <>
      {photoAnalisys.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {photoAnalisys.map((item, index) => (
            <Card key={item.id}>
              <div className="flex flex-col items-center truncate">
                <CardContent className="w-[430px] pt-2">
                  <Image src={item.url} alt="Imagem" width={400} height={400} />
                </CardContent>
                <CardFooter className="grid grid-flow-col w-full mb-2 p-0">
                  <div className="col-span-1 text-center font-bold py-1 ml-2 border-2 ">
                    <p>{index + 1}</p>
                  </div>
                  <div className="col-span-6 flex justify-center font-bold border-y-2 border-r-2 mr-2 h-9 items-center">
                    <p>{item.description}</p>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Array.from({ length: 3 }, (_, index) => (
            <Card key={index}>
              <div className="flex flex-col items-center truncate">
                <CardContent className="w-[430px] pt-2">
                  <Image src={imagem} alt="Imagem" width={400} height={400} />
                </CardContent>
                <CardFooter className="grid grid-flow-col w-full mb-2 p-0">
                  <div className="col-span-1 text-center font-bold py-1 ml-2 border-2 ">
                    <p>{index + 1}</p>
                  </div>
                  <div className="col-span-6 flex justify-center font-bold border-y-2 border-r-2 mr-2 h-9 items-center">
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
