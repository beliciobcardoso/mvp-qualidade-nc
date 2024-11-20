'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'

interface RemovePhotoProps {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  idPhoto: number
}

export default function RemovePhoto({
  dialogButton,
  dialogTitle,
  dialogDescription,
  idPhoto,
}: RemovePhotoProps) {
  const [open, setOpen] = useState(false)
  console.log(idPhoto)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>{dialogButton}</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <p>{idPhoto}</p>
        <div className="flex justify-around">
          <Button variant={'destructive'}>Excluir</Button>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
