'use client'
import placeHolder from '@/assets/logo-placeholder.png'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'

import { ClientType } from '@/lib/types'
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
        row.original.img === '' ||
        row.original.img === null ||
        row.original.img === undefined
          ? placeHolder
          : row.original.img
      return (
        <Image
          src={image}
          alt="imagem"
          width={32}
          height={32}
          className="h-8 w-8"
        />
      )
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
          dialogTitle={'Tela para Editar um Usuário'}
          dialogDescription={'Editar Usuário'}
          dialogData={data}
        />
      )
    },
  },
]
