'use client'
import { DialogReportProps } from '@/app/(main)/report/_components/typeDialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReportForm } from './dialogForm'

export function DialogReport({
  dialogButton,
  dialogTitle,
  dialogDescription,
  getItems,
}: DialogReportProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{dialogButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <ReportForm getItems={getItems ?? []} />
      </DialogContent>
    </Dialog>
  )
}
