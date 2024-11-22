'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { updateReportFinished } from '../actions'

interface AproveReportProps {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  idReport: number
}

export default function AproveReport({
  dialogButton,
  dialogTitle,
  dialogDescription,
  idReport,
}: AproveReportProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  function aproveReport(id: number) {
    return async () => {
      try {
        await updateReportFinished(id)
        setOpen(false)
        router.push('/relatorio')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>{dialogButton}</Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <p className="flex justify-center py-4 text-xl">
          Deseja finalizar o Relatório de número {idReport}
        </p>
        <div className="flex justify-around">
          <Button variant={'default'} onClick={aproveReport(idReport)}>
            Finalizar
          </Button>
          <Button variant={'destructive'} onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
