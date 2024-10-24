import { User } from '@prisma/client'
export type DialogNewProps = {
  dialogButton: string
  dialogTitle: string
  dialogDescription: string
  dialogData?: User
  openDialog?: boolean
}

export type ShowProps = {
  show: string
}
