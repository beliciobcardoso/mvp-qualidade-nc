import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogClient } from './_components/dialogClient'
import { getAllClient } from './actions'

export default async function ClientPage() {
  const dataClient = (await getAllClient()) || []
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
        <DialogClient
          dialogButton={'Novo Cliente'}
          dialogTitle={'Salvar Cliente'}
          dialogDescription={'Tela para salvar um novo Cliente'}
        />
      </div>
      <div>
        <DataTable columns={columns} data={dataClient} />
      </div>
    </div>
  )
}
