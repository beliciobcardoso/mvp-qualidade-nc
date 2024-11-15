'use client'
import { ColumnDef } from '@tanstack/react-table'

import { StructureTypeType } from '@/lib/types'
import { DialogStructureTypeUpdate } from './dialogStructureTypeUpdate'

export const columns: ColumnDef<StructureTypeType>[] = [
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
        <DialogStructureTypeUpdate
          dialogButton={'Editar'}
          dialogTitle={'Tipo de Estrutura'}
          dialogDescription={'Tela para Editar Tipo de Estrutura'}
          dialogData={data}
        />
      )
    },
  },
]
