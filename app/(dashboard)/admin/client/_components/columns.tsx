'use client'
import placeHolder from '@/assets/logo-placeholder.png'
import type { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

import type { ClientType } from '@/lib/types'
import { DialogClientUpdate } from './dialogClientUpdate'

export const columns: ColumnDef<ClientType>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'img',
    cell: ({ row }) => {
      const image =
        row.original.img === '' || row.original.img === null || row.original.img === undefined
          ? placeHolder
          : row.original.img
      return <Image src={image} alt="imagem" width={32} height={32} className="h-8 w-8" />
    },
  },
  {
    id: 'editReport',
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original
      return (
        <DialogClientUpdate
          dialogButton={'Editar'}
          dialogTitle={'Cliente'}
          dialogDescription={'Tela para Editar um Cliente'}
          dialogData={data}
        />
      )
    },
  },
]
