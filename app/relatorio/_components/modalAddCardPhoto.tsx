'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ModalAddCardPhotoType } from '@/lib/types'
import { useState } from 'react'
import { UploadImage } from './UploadImage'

export default function ModalAddCardPhoto({
  textButton,
  textTitle,
  textDescription,
}: ModalAddCardPhotoType) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block text-left">
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 md:right-4 lg:right-10 xl:right-48 2xl:right-60 bg-blue-500 text-white w-12 h-12 rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {textButton}
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{textTitle}</DialogTitle>
            <DialogDescription>{textDescription}</DialogDescription>
          </DialogHeader>
          <UploadImage />
        </DialogContent>
      </Dialog>
    </div>
  )
}
