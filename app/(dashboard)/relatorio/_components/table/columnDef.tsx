'use client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { getAllSites } from '@/app/(dashboard)/admin/site/actions'
import { getAllTechnician } from '@/app/(dashboard)/admin/technician/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ReportRelType, SiteTypeRel, TechnicianType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DialogRelatorio } from '../dialogRelatorio'

export const columns: ColumnDef<ReportRelType>[] = [
  {
    accessorKey: 'status',
    id: 'Status',
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
    accessorKey: 'client.name',
    id: 'Cliente',
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
    cell: ({ row }) => <div className="pl-4">{row.original.client.name}</div>,
  },
  {
    accessorKey: 'sites.idSite',
    id: 'Site ID',
    header: 'Site ID',
    cell: ({ row }) => (
      <div className="text-left">{row.original.sites.idSite}</div>
    ),
  },
  {
    accessorKey: 'technician.name',
    id: 'Técnico',
    header: 'Técnico',
    cell: ({ row }) => (
      <div className="text-left">{row.original.technician.name}</div>
    ),
  },
  {
    accessorKey: 'dateService',
    id: 'Data do Serviço',
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
    id: 'Data de Criação',
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
    id: 'EditReport',
    header: '',
    enableHiding: false,
    cell: ({ row }) => {
      return <EditReportCell row={row} />
    },
  },
  {
    accessorKey: 'AnalisarReport',
    header: '',
    enableHiding: false,
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

const EditReportCell: React.FC<{ row: { original: ReportRelType } }> = ({
  row,
}) => {
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
