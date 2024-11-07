'use client'
import { ColumnDef } from '@tanstack/react-table'

import { TipoSiteType } from '@/lib/types'
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
          dialogTitle={'Tela para Editar um Usuário'}
          dialogDescription={'Editar Usuário'}
          dialogData={data}
        />
      )
    },
  },
]
