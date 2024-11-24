'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PhotoAnalisysType } from '@/lib/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deletePhotoAnalisys } from '../actions'

interface RemovePhotoProps {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  PhotoAnalisys: PhotoAnalisysType
  index: number
}

export default function RemovePhoto({
  dialogButton,
  dialogTitle,
  dialogDescription,
  PhotoAnalisys,
  index,
}: RemovePhotoProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDelete = async (photoId: number) => {
    await deletePhotoAnalisys(photoId)
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
              <Image
                src={PhotoAnalisys.url}
                alt="Imagem"
                width={400}
                height={400}
              />
            </CardContent>
            <CardFooter className="mb-2 grid w-full grid-flow-col p-0 pb-2 pt-2">
              <div className="col-span-1 ml-2 border-2 py-1 text-center font-bold">
                <p>{index}</p>
              </div>
              <div className="col-span-6 mr-2 flex h-9 items-center justify-center border-y-2 border-r-2 font-bold">
                <p>{PhotoAnalisys.description}</p>
              </div>
            </CardFooter>
          </div>
        </Card>
        <div className="flex justify-around">
          <Button
            variant={'destructive'}
            onClick={() =>
              PhotoAnalisys.id !== undefined && handleDelete(PhotoAnalisys.id)
            }
          >
            SIM
          </Button>
          <Button onClick={() => setOpen(false)}>NÃO</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
