'use client'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown } from 'lucide-react'

import { getRelatorios } from '@/app/_components/relatorio/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Relatorio } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { DialogRelatorio } from './dialogRelatorio'

// export type Relatorio = {
//   id: number
//   nomeCliente: string
//   idSite: string
//   altura?: string
//   endereco: string
//   bairro: string
//   numero: string
//   cidade: string
//   uf: string
//   tecnico: string
//   dataServico: Date
//   createdAt: Date
//   updatedAt?: Date
//   finishedAt?: Date
//   tipoSite: string
//   tipoEstrutura: string
// }

const columns: ColumnDef<Relatorio>[] = [
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
      // console.log(relatorio)
      return (
        <DialogRelatorio
          dialogButton={'Editar'}
          dialogDescription={'Editar Relatório'}
          dialogTitle={'Tela para Editar Relatório'}
          relatorio={relatorio}
          // onEdit={() => handleEditReport(row.original)}
        />
      )
    },
  },
]

export function TableRelatorio() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [data, setData] = useState<Relatorio[]>([])

  useEffect(() => {
    getRelatorios().then((relatorios) => setData(relatorios))
  }, [])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Global Filter..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-[200px]"
        />
        <Input
          placeholder="Filter nome do Cliente..."
          value={
            (table.getColumn('nomeCliente')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('nomeCliente')?.setFilterValue(event.target.value)
          }
          className="max-w-[200px] ml-4"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} Linha(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
