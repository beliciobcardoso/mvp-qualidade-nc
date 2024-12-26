import HeaderPage from '@/components/header-page'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogClient } from './_components/dialogClient'
import { getAllClient } from './actions'

export default async function ClientPage() {
  const dataClient = (await getAllClient()) || []
  return (
    <main>
      <HeaderPage pageName={'Clientes'} />
      <div className="flex items-center justify-end space-y-2 pt-2">
        <DialogClient
          dialogButton={'Novo Cliente'}
          dialogTitle={'Cliente'}
          dialogDescription={'Tela para salvar um novo Cliente'}
        />
      </div>
      <div>
        <DataTable columns={columns} data={dataClient} />
      </div>
    </main>
  )
}
