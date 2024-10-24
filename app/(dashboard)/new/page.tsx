import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogNew } from './_components/dialogNew'
import { Show } from './_components/show'
import { getData } from './actions'

export default async function NewPage() {
  const data = await getData()
  return (
    <main className="flex min-h-screen min-w-min flex-col">
      <div className="flex justify-end gap-4 p-4">
        <DialogNew
          dialogButton={'Salvar Nome'}
          dialogTitle={'Salve Nome'}
          dialogDescription={'Tela para Salvar um novo Nome'}
        />
      </div>
      <div className="container mx-auto py-4 w-fit">
        <DataTable columns={columns} data={data} />
      </div>
      <div>
        <Show />
      </div>
    </main>
  )
}
