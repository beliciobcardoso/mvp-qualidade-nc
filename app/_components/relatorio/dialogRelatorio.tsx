import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DialogReportProps } from '@/lib/types'
import FormRelatorio from './formRelatorio'

export function DialogRelatorio({
  dialogButton,
  dialogTitle,
  dialogDescription,
  relatorio,
}: DialogReportProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{dialogButton}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[600px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <FormRelatorio report={relatorio} />
      </DialogContent>
    </Dialog>
  )
}
