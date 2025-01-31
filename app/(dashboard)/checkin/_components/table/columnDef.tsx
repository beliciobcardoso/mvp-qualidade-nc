'use client'
import { getAllProvider } from '@/app/(dashboard)/admin/provider/actions'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { CheckInRelationType } from '@/lib/types'
import type { Provider } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DialogCheckInUpdate } from '../dialogCheckInUpdate'

export const columns: ColumnDef<CheckInRelationType>[] = [
  {
    id: 'ID',
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="text-left">{row.original.id}</div>,
  },
  {
    id: 'Fornecedor',
    accessorKey: 'provider.name',
    header: 'Fornecedor',
    cell: ({ row }) => <div className="text-left">{row.original.provider.name}</div>,
  },
  {
    id: 'Usuário Criador',
    accessorKey: 'user.name',
    header: 'Usuário Criador',
    cell: ({ row }) => <div className="text-left">{row.original.user.name}</div>,
  },
  {
    id: 'Data do Serviço',
    accessorKey: 'dateService',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Data do Serviço
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.dateCheckIn)
      return <div className="pl-4">{format(date, 'dd/MM/yyyy', { locale: ptBR })}</div>
    },
  },
  {
    id: 'Data de Criação',
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Data de Criação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return <div className="pl-4">{format(date, 'dd/MM/yyyy', { locale: ptBR })}</div>
    },
  },
  {
    id: 'Ações',
    enableHiding: false,
    cell: ({ row }) => {
      const relatorio = row.original
      const { dateCheckIn } = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <EditCheckInCell row={row} />
            <DropdownMenuSeparator />
            {dateCheckIn && (
              <Link href={`/relatorio/${relatorio.id}`}>
                <DropdownMenuItem className="cursor-pointer">Analisar</DropdownMenuItem>
              </Link>
            )}
            {dateCheckIn && (
              <Link href={`/reportviewer/${relatorio.id}`} target="_blank">
                <DropdownMenuItem className="cursor-pointer">Visualizar</DropdownMenuItem>
              </Link>
            )}
            {dateCheckIn && (
              <Link href={`/api/reportpdf/${relatorio.id}`} target="_blank">
                <DropdownMenuItem className="cursor-pointer">Gerar PDF</DropdownMenuItem>
              </Link>
            )}
            {dateCheckIn && (
              <Link href={`/relatorio/${relatorio.id}`}>
                <DropdownMenuItem className="cursor-pointer">Reabrir Check-in</DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const EditCheckInCell: React.FC<{ row: { original: CheckInRelationType } }> = ({ row }) => {
  const checkIn = row.original
  const [providerData, setProviderData] = useState<Provider[]>([])

  useEffect(() => {
    const fetchProviderData = async () => {
      const data = await getAllProvider()
      if (data) {
        setProviderData(data)
      }
    }
    fetchProviderData()
  }, [])

  return (
    <DialogCheckInUpdate
      dialogProps={{
        dialogButton: 'Editar',
        dialogTitle: 'Check-in',
        dialogDescription: 'Tela para Editar Check-in',
      }}
      checkInData={checkIn}
      providerData={providerData}
    />
  )
}
