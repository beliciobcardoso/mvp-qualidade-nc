'use client'
import type { ColumnDef } from '@tanstack/react-table'

import type { TipoSiteType } from '@/lib/types'
import { DialogTipoSiteTypeUpdate } from './dialogTypeSiteUpdate'

export const columns: ColumnDef<TipoSiteType>[] = [
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
        <DialogTipoSiteTypeUpdate
          dialogButton={'Editar'}
          dialogTitle={'Tipo de Site'}
          dialogDescription={'Tela para Editar tipo de site'}
          dialogData={data}
        />
      )
    },
  },
]
