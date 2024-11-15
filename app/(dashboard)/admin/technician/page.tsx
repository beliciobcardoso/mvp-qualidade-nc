import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogTechnician } from './_components/dialogTechnician'
import { getAllTechnician } from './actions'

export default async function TechnicianPage() {
  const dataTechnician = (await getAllTechnician()) || []
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Técnicos</h2>
        <DialogTechnician
          dialogButton={'Novo Técnico'}
          dialogTitle={'Técnico'}
          dialogDescription={'Tela para salvar um novo Técnico'}
        />
      </div>
      <div>
        <DataTable columns={columns} data={dataTechnician} />
      </div>
    </div>
  )
}
