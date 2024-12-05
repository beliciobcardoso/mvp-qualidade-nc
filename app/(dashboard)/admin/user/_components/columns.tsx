'use client'
import type { ColumnDef } from '@tanstack/react-table'

import type { UserForm } from '@/lib/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DialogUserRePwd } from './dialogUserRePwd'
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
      }
      if (role === 'USER') {
        return 'Usuário'
      }
      if (role === 'COORDINATOR') {
        return 'Coordenador'
      }
      if (role === 'ANALYST') {
        return 'Analista'
      }
      if (role === 'TECHNICIAN') {
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
          dialogTitle={'Usuário'}
          dialogDescription={'Tela para Editar um Usuário'}
          dialogData={person}
        />
      )
    },
  },
  {
    accessorKey: 'editReport',
    header: '',
    enableHiding: false,
    cell: ({ row }) => {
      const person = row.original
      const UserId = person.id
      return (
        <DialogUserRePwd
          dialogButton={'Redefinir Senha'}
          dialogTitle={'Redefinir Senha'}
          dialogDescription={'Tela para Redefinir Senha'}
          UserId={UserId ?? null}
        />
      )
    },
  },
]
