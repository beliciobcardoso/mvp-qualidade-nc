'use client'
import type { ScopeService } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import { DialogScopeServiceUpdate } from './dialogScopeServiceUpdate'

export const columns: ColumnDef<ScopeService>[] = [
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
        <DialogScopeServiceUpdate
          dialogButton={'Editar'}
          dialogTitle={'Serviço'}
          dialogDescription={'Tela para Editar um Serviço'}
          dialogData={data}
        />
      )
    },
  },
]
