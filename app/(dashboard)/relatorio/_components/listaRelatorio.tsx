import { getRelatorios } from '@/app/(dashboard)/relatorio/actions'
import { columns } from './table/columnDef'
import { TableRelatorio } from './table/tableRelatorio'

export default async function ListaRelatorio() {
  const data = await getRelatorios()
  return (
    <main className="flex flex-col items-center gap-8">
      <TableRelatorio data={data} columns={columns} />
    </main>
  )
}
