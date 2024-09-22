import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import FormRelatorio from './formRelatorio'

export function DialogRelatorio() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Criar Relatório</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] sm:max-h-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Relatório</DialogTitle>
        </DialogHeader>
        <FormRelatorio />
      </DialogContent>
    </Dialog>
  )
}
