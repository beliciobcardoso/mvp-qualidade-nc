'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Filtrar Fornecedor..."
          value={(table.getColumn('Fornecedor')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('Fornecedor')?.setFilterValue(event.target.value)}
          className="h-8 max-w-[200px]"
        />
        <Input
          placeholder="Filtro Usuário..."
          value={(table.getColumn('Usuário Criador')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('Usuário Criador')?.setFilterValue(event.target.value)}
          className="h-8 max-w-[200px]"
        />
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
