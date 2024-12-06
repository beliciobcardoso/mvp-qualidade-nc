'use client'
import imagem from '@/assets/image.svg'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { PhotoAnalisysType, Relatorio } from '@/lib/types'
import Image from 'next/image'
import RemovePhoto from './removePhoto'

interface PhotoAnalisysProps {
  photoAnalisys: PhotoAnalisysType[]
  relatorioHeader: Relatorio
}

export default function PhotoAnalisys({ photoAnalisys, relatorioHeader }: PhotoAnalisysProps) {
  return (
    <>
      {photoAnalisys.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {photoAnalisys.map((item, index) => (
            <Card key={item.id} className="">
              <div className="flex h-full flex-col items-center justify-between truncate">
                <CardContent className="w-[430px] pb-0 pt-2">
                  <div className="flex justify-end pb-2">
                    {relatorioHeader.finishedAt ? (
                      <></>
                    ) : (
                      <RemovePhoto
                        PhotoAnalisys={item}
                        index={index + 1}
                        dialogButton={'X'}
                        dialogTitle={'Excluir Foto'}
                        dialogDescription={'Tela para excluir uma foto'}
                      />
                    )}
                  </div>
                  <Image src={item.url} alt="Imagem" width={400} height={800} />
                </CardContent>
                <CardFooter className="mb-2 grid max-h-20 w-full grid-flow-col p-2">
                  <div className="col-span-1 flex h-full items-center justify-center border-2 py-1 font-bold">
                    <p>{index + 1}</p>
                  </div>
                  <div className="col-span-4 mr-2 h-full border-2 p-2 font-bold">
                    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
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
