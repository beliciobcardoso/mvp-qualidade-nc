import HeaderPage from '@/components/header-page'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogTechnician } from './_components/dialogTechnician'
import { getAllTechnician } from './actions'

export default async function TechnicianPage() {
  const dataTechnician = (await getAllTechnician()) || []
  return (
    <main>
      <HeaderPage pageName={'Técnicos'} />
      <div className="flex items-center justify-end space-y-2 pt-2">
        <DialogTechnician
          dialogButton={'Novo Técnico'}
          dialogTitle={'Técnico'}
          dialogDescription={'Tela para salvar um novo Técnico'}
        />
      </div>
      <div>
        <DataTable columns={columns} data={dataTechnician} />
      </div>
    </main>
  )
}
