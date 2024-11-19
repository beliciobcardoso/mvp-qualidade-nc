'use client'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

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
import { ReportRelType, SiteTypeRel, TechnicianType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DialogRelatorio } from '../dialogRelatorio'

// const EditReportCell = ({
//   row,
// }: {
//   row: {
//     original: ReportRelType
//   }
// }) => {
//   const reports = row.original
//   const [technicianData, setTechnicianData] = useState<TechnicianType[]>([])
//   const [siteData, setSiteData] = useState<SiteTypeRel[]>([])

//   useEffect(() => {
//     const fetchTechnicianData = async () => {
//       const data = await getAllTechnician()
//       if (data) {
//         setTechnicianData(data)
//       }
//     }
//     const fetchSiteData = async () => {
//       const data = await getAllSites()
//       if (data) {
//         setSiteData(data)
//       }
//     }
//     fetchTechnicianData()
//     fetchSiteData()
//   }, [])

//   return (
//     <DialogRelatorio
//       dialogButton={'Editar'}
//       dialogTitle={'Relatório'}
//       dialogDescription={'Tela para Editar Relatório'}
//       report={reports}
//       siteData={siteData}
//       technicianData={technicianData}
//     />
//   )
// }

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

      return (
        <Badge
          variant="outline"
          className={cn(statusVariant, 'text-left text-white')}
        >
          {status}
        </Badge>
      )
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
    id: 'Ações',
    enableHiding: false,
    cell: ({ row }) => {
      const relatorio = row.original
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
              <DropdownMenuItem className="cursor-pointer">
                Analisar
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
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
