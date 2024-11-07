'use client'
import { ColumnDef } from '@tanstack/react-table'

import { TechnicianType } from '@/lib/types'
import { DialogTechnicianUpdate } from './dialogTechnicianUpdate'

export const columns: ColumnDef<TechnicianType>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    id: 'editReport',
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original
      return (
        <DialogTechnicianUpdate
          dialogButton={'Editar'}
          dialogTitle={'Tela para Editar um Usuário'}
          dialogDescription={'Editar Usuário'}
          dialogData={data}
        />
      )
    },
  },
]
