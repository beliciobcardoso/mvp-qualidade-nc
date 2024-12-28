'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { PhotoAnalisysType } from '@/lib/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deletePhotoAnalisys } from '../actions'

interface RemovePhotoProps {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  photoAnalisys: PhotoAnalisysType
  index: number
}

export default function RemovePhoto({
  dialogButton,
  dialogTitle,
  dialogDescription,
  photoAnalisys,
  index,
}: RemovePhotoProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async (photoAnalisysData: PhotoAnalisysType) => {
    await deletePhotoAnalisys(photoAnalisysData)
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)} variant={'destructive'}>
        {dialogButton}
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <p>Deseja deletar a foto de número {index} deste Relatório?</p>
        </div>
        <Card>
          <div className="flex h-full flex-col items-center justify-between truncate">
            <CardContent className="w-[430px] pb-0 pt-2">
              <Image src={photoAnalisys.url} alt="Imagem" width={400} height={400} />
            </CardContent>
            <CardFooter className="mb-2 grid max-h-20 w-full grid-flow-col p-2">
              <div className="col-span-1 flex h-full items-center justify-center border-2 py-1 font-bold">
                <p>{index}</p>
              </div>
              <div className="col-span-4 mr-2 h-full border-2 p-2 font-bold">
                <div
                  className="max-w-96 max-h-14 text-wrap"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                  dangerouslySetInnerHTML={{
                    __html: photoAnalisys.description,
                  }}
                />
              </div>
            </CardFooter>
          </div>
        </Card>
        <div className="flex justify-around">
          <Button
            variant={'destructive'}
            onClick={() => photoAnalisys.id !== undefined && handleDelete(photoAnalisys)}
          >
            SIM
          </Button>
          <Button onClick={() => setOpen(false)}>NÃO</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
