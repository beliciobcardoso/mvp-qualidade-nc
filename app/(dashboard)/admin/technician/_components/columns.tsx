'use client'
import type { TechnicianType } from '@/lib/types'
import type { ColumnDef } from '@tanstack/react-table'
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
          dialogTitle={'Técnico'}
          dialogDescription={'Tela para Editar um Técnico'}
          dialogData={data}
        />
      )
    },
  },
]
