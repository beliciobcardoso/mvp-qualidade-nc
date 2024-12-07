'use client'
import { getAllSites } from '@/app/(dashboard)/admin/site/actions'
import { getAllTechnician } from '@/app/(dashboard)/admin/technician/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ReportRelType, SiteTypeRel, TechnicianType } from '@/lib/types'
import { cn } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DialogRelatorio } from '../dialogRelatorio'
import { DataTableColumnHeader } from './data-table-column-header'

export const columns: ColumnDef<ReportRelType>[] = [
  {
    accessorKey: 'id',
    id: 'ID',
    header: 'ID Relatório',
    cell: ({ row }) => <div className="text-left">{row.original.id}</div>,
  },
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

      return (
        <Badge variant="outline" className={cn(statusVariant, 'text-left text-white')}>
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, filterValue) => {
      const { updatedAt, finishedAt } = row.original

      let status = 'created'
      if (finishedAt) {
        status = 'done'
      } else if (updatedAt) {
        status = 'in progress'
      }
      return filterValue.includes(status)
    },
  },
  {
    accessorKey: 'sites.client.name',
    id: 'Cliente',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Cliente" />,
    cell: ({ row }) => <div className="pl-4">{row.original.sites.client.name}</div>,
  },
  {
    accessorKey: 'sites.idSite',
    id: 'Site ID',
    header: 'Site ID',
    cell: ({ row }) => <div className="text-left">{row.original.sites.idSite}</div>,
  },
  {
    accessorKey: 'technician.name',
    id: 'Técnico',
    header: 'Técnico',
    cell: ({ row }) => <div className="text-left">{row.original.technician.name}</div>,
  },
  {
    accessorKey: 'user.name',
    id: 'Usuário',
    header: 'Usuario criador',
    cell: ({ row }) => <div className="text-left">{row.original.user.name}</div>,
  },
  {
    accessorKey: 'analyst.name',
    id: 'Analista',
    header: 'Analista',
    cell: ({ row }) => {
      const analyst = row.original.analyst

      return <div className="text-left">{analyst === null ? 'N/A' : analyst.name}</div>
    },
  },
  {
    accessorKey: 'dateService',
    id: 'Data do Serviço',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Data do Serviço
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.dateService)
      return <div className="pl-4">{format(date, 'dd/MM/yyyy', { locale: ptBR })}</div>
    },
  },
  {
    accessorKey: 'createdAt',
    id: 'Data de Criação',
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
    accessorKey: 'updatedAt',
    id: 'Inicio da Análise',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Inicio da Análise
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.original.updatedAt ? new Date(row.original.updatedAt) : null
      return <div className="pl-4">{date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : 'N/A'}</div>
    },
  },
  {
    accessorKey: 'finishedAt',
    id: 'Data da Finalização',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Análise Finalizada
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.original.finishedAt ? new Date(row.original.finishedAt) : null
      return <div className="pl-4">{date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : 'N/A'}</div>
    },
  },
  {
    id: 'Ações',
    enableHiding: false,
    cell: ({ row }) => {
      const relatorio = row.original
      const { finishedAt } = row.original
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
            <EditReportCell row={row} />
            <DropdownMenuSeparator />
            <Link href={`/relatorio/${relatorio.id}`}>
              <DropdownMenuItem className="cursor-pointer">Analisar</DropdownMenuItem>
            </Link>
            {finishedAt && (
              <Link href={`api/reportpdf/${relatorio.id}`} target="_blank">
                <DropdownMenuItem className="cursor-pointer">Gerar PDF</DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const EditReportCell: React.FC<{ row: { original: ReportRelType } }> = ({ row }) => {
  const reports = row.original
  const [technicianData, setTechnicianData] = useState<TechnicianType[]>([])
  const [siteData, setSiteData] = useState<SiteTypeRel[]>([])

  useEffect(() => {
    const fetchTechnicianData = async () => {
      const data = await getAllTechnician()
      if (data) {
        setTechnicianData(data)
      }
    }
    const fetchSiteData = async () => {
      const data = await getAllSites()
      if (data) {
        setSiteData(data)
      }
    }
    fetchTechnicianData()
    fetchSiteData()
  }, [])

  return (
    <DialogRelatorio
      dialogButton={'Editar'}
      dialogTitle={'Relatório'}
      dialogDescription={'Tela para Editar Relatório'}
      report={reports}
      siteData={siteData}
      technicianData={technicianData}
    />
  )
}
