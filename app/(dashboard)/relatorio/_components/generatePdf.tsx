'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import puppeteer from 'puppeteer'
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
      const browser = await puppeteer.launch()
      // const filePDF = await fetch(`/api/reportpdf/${id}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/pdf',
      //   },
      // })

      const page = await browser.newPage()
      await page.setViewport({ width: 1600, height: 1024 })
      await page.goto(`${process.env.URL_APP}/reportviewer/${id}`, {
        waitUntil: 'networkidle0',
      })

      const pdf = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      })

      console.log(pdf)

      await browser.close()

      // const blob = await filePDF.blob()

      // const url = URL.createObjectURL(pdf)
      // const a = document.createElement('a')
      // a.href = url
      // a.download = `relatorio-${id}.pdf`
      // a.click()
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
