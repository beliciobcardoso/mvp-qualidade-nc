import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogUser } from './_components/dialogUser'
import { getData } from './actions'

export default async function UserPage() {
  const data = await getData()
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Usuários</h2>
        <DialogUser
          dialogButton={'Novo usuario'}
          dialogTitle={'Usuário'}
          dialogDescription={'Tela para Salvar um novo Usuário'}
        />
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}
