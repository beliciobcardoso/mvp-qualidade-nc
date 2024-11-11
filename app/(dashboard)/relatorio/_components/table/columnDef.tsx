'use client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Relatorio } from '@/lib/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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
    accessorKey: 'Cliente',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'desc')}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="pl-4">{row.original.client.name}</div>,
  },
  {
    accessorKey: 'idSite',
    header: 'ID Site',
    cell: ({ row }) => (
      <div className="text-left">{row.original.sites.idSite}</div>
    ),
  },
  {
    accessorKey: 'tecnico',
    header: 'Técnico',
    cell: ({ row }) => (
      <div className="text-left">{row.original.technician?.name}</div>
    ),
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
    cell: ({ row }) => {
      const date = new Date(row.original.dateService)
      return (
        <div className="pl-4">
          {format(date, 'dd/MM/yyyy', { locale: ptBR })}
        </div>
      )
    },
  },
  {
    accessorKey: 'dataCriação',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data de Criação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return (
        <div className="pl-4">
          {format(date, 'dd/MM/yyyy', { locale: ptBR })}
        </div>
      )
    },
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
          className="rounded-md border border-input bg-background p-2 font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
          href={`/relatorio/${relatorio.id}`}
        >
          Analisar
        </Link>
      )
    },
  },
]
