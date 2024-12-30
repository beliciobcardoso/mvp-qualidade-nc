'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { reopenReport } from '../actions'

interface ReopenReportProps {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  idReport: number
}

export default function ReopenReport({ dialogButton, dialogTitle, dialogDescription, idReport }: ReopenReportProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  function OpenReport(id: number) {
    return async () => {
      setIsLoading(true)
      await reopenReport(id)
      setIsLoading(false)
      setOpen(false)
      router.refresh()
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

        {isLoading ?
          (<p className="flex justify-center py-4 text-xl">Aguarde, reabrindo o relatório...</p>) :
          (<p className="flex justify-center py-4 text-xl">Deseja reabrir do relatório?</p>)}

        <div className="flex justify-around">
          <Button variant={'default'} disabled={isLoading} onClick={OpenReport(idReport)}>
            Reabrir Relatório
          </Button>
          <Button variant={'destructive'} disabled={isLoading} onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
