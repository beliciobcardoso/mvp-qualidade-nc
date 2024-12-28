'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'
import { statuses } from '../../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
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
          placeholder="Filtrar Cliente..."
          value={(table.getColumn('Cliente')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('Cliente')?.setFilterValue(event.target.value)}
          className="h-8 max-w-[200px]"
        />
        <Input
          placeholder="Filtro Analista..."
          value={(table.getColumn('Analista')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('Analista')?.setFilterValue(event.target.value)}
          className="h-8 max-w-[200px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter column={table.getColumn('status')} title="Status" options={statuses} />
        )}
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
