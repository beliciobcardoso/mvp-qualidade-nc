'use client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Relatorio } from '@/lib/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { DialogRelatorio } from '../dialogRelatorio'

export const columns: ColumnDef<Relatorio>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { updatedAt, finishedAt } = row.original

      let status = 'Criado'
      let statusVariant = 'bg-blue-500'

      if (finishedAt) {
        status = 'Finalizado'
        statusVariant = 'bg-green-500'
      } else if (updatedAt) {
        status = 'Em andamento'
        statusVariant = 'bg-yellow-500'
      }

      return <Badge className={cn(statusVariant, 'text-left')}>{status}</Badge>
    },
  },
  {
    accessorKey: 'nomeCliente',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="pl-4">{row.getValue('nomeCliente')}</div>
    ),
  },
  {
    accessorKey: 'idSite',
    header: 'ID Site',
    cell: ({ row }) => <div className="text-left">{row.original.idSite}</div>,
  },
  {
    accessorKey: 'endereco',
    header: 'Endereço',
    cell: ({ row }) => <div className="text-left">{row.original.endereco}</div>,
  },
  {
    accessorKey: 'bairro',
    header: 'Bairro',
    cell: ({ row }) => <div className="text-left">{row.original.bairro}</div>,
  },
  {
    accessorKey: 'numero',
    header: 'Número',
    cell: ({ row }) => <div className="text-left">{row.original.numero}</div>,
  },
  {
    accessorKey: 'cidade',
    header: 'Cidade',
    cell: ({ row }) => <div className="text-left">{row.original.cidade}</div>,
  },
  {
    accessorKey: 'uf',
    header: 'UF',
    cell: ({ row }) => <div className="text-left">{row.original.uf}</div>,
  },
  {
    accessorKey: 'tecnico',
    header: 'Técnico',
    cell: ({ row }) => <div className="text-left">{row.original.tecnico}</div>,
  },
  {
    accessorKey: 'dataServico',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data do Serviço
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-left font-medium pl-4">
        {row.original.dataServico.toLocaleDateString()}
      </div>
    ),
  },
  {
    accessorKey: 'EditReport',
    header: '',
    cell: ({ row }) => {
      const relatorio = row.original
      return (
        <DialogRelatorio
          dialogButton={'Editar'}
          dialogDescription={'Editar Relatório'}
          dialogTitle={'Tela para Editar Relatório'}
          relatorio={relatorio}
        />
      )
    },
  },
  {
    accessorKey: 'AnalisarReport',
    header: '',
    cell: ({ row }) => {
      const relatorio = row.original
      return (
        <Link
          className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md font-medium"
          href={`/relatorio/${relatorio.id}`}
        >
          Analisar
        </Link>
      )
    },
  },
]
