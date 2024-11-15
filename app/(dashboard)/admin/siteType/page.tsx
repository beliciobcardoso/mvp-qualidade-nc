import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogSiteType } from './_components/dialogTypeSite'
import { getAllSitesType } from './actions'

export default async function TypeSitePage() {
  const dataSiteType = (await getAllSitesType()) || []
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tipos de Sites</h2>
        <DialogSiteType
          dialogButton={'Novo Tipo de Site'}
          dialogTitle={'Tipo de Site'}
          dialogDescription={'Tela para salvar um novo Tipo de Site'}
        />
      </div>
      <div>
        <DataTable columns={columns} data={dataSiteType} />
      </div>
    </div>
  )
}
