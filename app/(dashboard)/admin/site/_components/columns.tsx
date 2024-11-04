'use client'
import { ColumnDef } from '@tanstack/react-table'

import { SiteTypeRel } from '@/lib/types'
import { DialogUserUpdate } from './dialogSiteUpdate'

export const columns: ColumnDef<SiteTypeRel>[] = [
  {
    accessorKey: 'idSite',
    header: 'ORIGINAL ID',
  },
  {
    accessorKey: 'idClient',
    header: 'Cliente',
    cell: ({ row }) => {
      return <div className="text-left">{row.original.client.name}</div>
    },
  },
  {
    accessorKey: 'siteTypeId',
    header: 'Tipo de Site',
    cell: ({ row }) => {
      return <div className="text-left">{row.original.siteType.name}</div>
    },
  },
  {
    accessorKey: 'structureTypeId',
    header: 'Tipo de Estrutura',
    cell: ({ row }) => {
      return <div className="text-left">{row.original.structureType.name}</div>
    },
  },
  {
    accessorKey: 'editReport',
    header: '',
    cell: ({ row }) => {
      const data = row.original
      return (
        <DialogUserUpdate
          dialogButton={'Editar'}
          dialogTitle={'Tela para Editar um Usuário'}
          dialogDescription={'Editar Usuário'}
          dialogData={data}
        />
      )
    },
  },
]
