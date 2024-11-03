'use client'
import { ColumnDef } from '@tanstack/react-table'

import { UserForm } from '@/lib/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DialogUserUpdate } from './dialogUserUpdate'

export const columns: ColumnDef<UserForm>[] = [
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
        <DialogUserUpdate
          dialogButton={'Editar'}
          dialogTitle={'Tela para Editar um Usuário'}
          dialogDescription={'Editar Usuário'}
          dialogData={person}
        />
      )
    },
  },
]
