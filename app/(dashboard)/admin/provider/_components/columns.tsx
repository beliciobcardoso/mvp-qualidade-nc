'use client'
import type { ColumnDef } from '@tanstack/react-table'
import { DialogProviderUpdate } from './dialogProviderUpdate'
import type { Provider } from '@prisma/client'

export const columns: ColumnDef<Provider>[] = [
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
        <DialogProviderUpdate
          dialogProps={{
            dialogButton: 'Editar',
            dialogTitle: 'Cliente',
            dialogDescription: 'Tela para Editar um Cliente',
          }}
          provider={data}
        />
      )
    },
  },
]
