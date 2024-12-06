'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { ModalAddCardPhotoType } from '@/lib/types'
import { useState } from 'react'
import { UploadImage } from './UploadImage'

export default function ModalAddCardPhoto({ textButton, textTitle, textDescription }: ModalAddCardPhotoType) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block text-left">
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-9 right-4 h-12 w-12 rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 md:right-4 lg:right-10 xl:right-14 2xl:right-60"
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
