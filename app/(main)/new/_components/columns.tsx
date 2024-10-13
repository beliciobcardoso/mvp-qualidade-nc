'use client'
import { User } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { DialogNew } from './dialogNew'

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
    accessorKey: 'editReport',
    header: '',
    cell: ({ row }) => {
      const person = row.original
      return (
        <DialogNew
          dialogButton={'Editar'}
          dialogDescription={'Editar Nome'}
          dialogTitle={'Tela para Editar Nome'}
          dialogData={person}
        />
      )
    },
  },
]
