import { TableRelatorio } from './tableRelatorio'

export default function ListaRelatorio() {
  return (
    <main className="flex flex-col gap-8 items-center">
      <h1 className="text-4xl">Relatórios</h1>
      <TableRelatorio />
    </main>
  )
}
