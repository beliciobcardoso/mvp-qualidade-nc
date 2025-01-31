import HeaderPage from '@/components/header-page'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogProvider } from './_components/dialogProvider'
import { getAllProvider } from './actions'

export default async function ProviderPage() {
  const dataProvider = (await getAllProvider()) || []
  return (
    <main>
      <HeaderPage pageName={'Fornecedores'} />
      <div className="flex items-center justify-end space-y-2 pt-2">
        <DialogProvider
          dialogProps={{
            dialogButton: 'Novo Fornecedor',
            dialogTitle: 'Fornecedor',
            dialogDescription: 'Tela para salvar um novo Fornecedor',
          }}
        />
      </div>
      <div>
        <DataTable columns={columns} data={dataProvider} />
      </div>
    </main>
  )
}
