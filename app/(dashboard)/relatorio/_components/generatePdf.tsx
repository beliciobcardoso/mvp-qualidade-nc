'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

interface GeneratePdfProps {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  idReport: number
}

export default function GeneratePdf({ dialogButton, dialogTitle, dialogDescription, idReport }: GeneratePdfProps) {
  const [open, setOpen] = useState(false)

  function generatePdf(id: number) {
    return async () => {
      const filePDF = await fetch(`/api/reportpdf/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      })

      const blob = await filePDF.blob()

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `relatorio-${id}.pdf`
      a.click()
      setOpen(false)
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
        <p className="flex justify-center py-4 text-xl">Deseja gerar o PDF do relatório?</p>
        <div className="flex justify-around">
          <Button variant={'default'} onClick={generatePdf(idReport)}>
            Gerar
          </Button>
          <Button variant={'destructive'} onClick={() => setOpen(false)}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
