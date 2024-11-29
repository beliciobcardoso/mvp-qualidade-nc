'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DialogServiceDescriptionProps } from '@/lib/types'
import { useState } from 'react'
import ServiceDescriptionForm from './serviceDescriptionForm'

export function DialogServiceDescription({
  dialogButton,
  dialogTitle,
  dialogDescription,
  idReport,
}: DialogServiceDescriptionProps) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>{dialogButton}</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <ServiceDescriptionForm
          id={idReport}
          handleModal={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
