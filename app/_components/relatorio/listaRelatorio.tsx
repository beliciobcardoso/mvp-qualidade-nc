import { getRelatorios } from './actions'
import { columns } from './table/columnDef'
import { TableRelatorio } from './table/tableRelatorio'

export default async function ListaRelatorio() {
  const data = await getRelatorios()
  return (
    <main className="flex flex-col gap-8 items-center">
      <h1 className="text-4xl">Relatórios</h1>
      <TableRelatorio data={data} columns={columns} />
    </main>
  )
}
