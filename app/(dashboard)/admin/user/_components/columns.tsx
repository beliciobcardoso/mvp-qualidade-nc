'use client'
import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { DialogUser } from './dialogUser'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'E-Mail',
  },
  {
    accessorKey: 'role',
    header: 'Função',
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de Criação',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return format(date, 'dd/MM/yyyy', { locale: ptBR })
    },
  },
  {
    accessorKey: 'editReport',
    header: '',
    cell: ({ row }) => {
      const person = row.original
      return (
        <DialogUser
          dialogButton={'Editar'}
          dialogDescription={'Editar Nome'}
          dialogTitle={'Tela para Editar Nome'}
          dialogData={person}
        />
      )
    },
  },
]
