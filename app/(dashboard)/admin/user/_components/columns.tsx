'use client'
import { ColumnDef } from '@tanstack/react-table'

import { UserForm } from '@/lib/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DialogUserUpdate } from './dialogUserUpdate'

export const columns: ColumnDef<UserForm>[] = [
  {
    accessorKey: 'name',
    id: 'Nome',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    id: 'E-Mail',
    header: 'E-Mail',
  },
  {
    accessorKey: 'role',
    id: 'Função',
    header: 'Função',
    cell: ({ row }) => {
      const role = row.original.role
      if (role === 'ADMIN') {
        return 'Administrador'
      } else if (role === 'USER') {
        return 'Usuário'
      } else if (role === 'COORDINATOR') {
        return 'Coordenador'
      } else if (role === 'ANALYST') {
        return 'Analista'
      } else if (role === 'TECHNICIAN') {
        return 'Técnico'
      }
    },
  },
  {
    accessorKey: 'createdAt',
    id: 'Data de Criação',
    header: 'Data de Criação',
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return format(date, 'dd/MM/yyyy', { locale: ptBR })
    },
  },
  {
    accessorKey: 'editReport',
    header: '',
    enableHiding: false,
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
