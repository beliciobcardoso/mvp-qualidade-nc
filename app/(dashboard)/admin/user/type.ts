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

export type UserCreate = {
  name: string
  email: string
  role: 'ADMIN' | 'USER' | 'ANALYST' | 'TECHNICIAN' | 'COORDINATOR'
  password: string
}

export type userUpdate = {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER' | 'ANALYST' | 'TECHNICIAN' | 'COORDINATOR'
}
