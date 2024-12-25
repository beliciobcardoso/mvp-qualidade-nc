import HeaderPage from '@/components/header-page'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogSiteType } from './_components/dialogTypeSite'
import { getAllSitesType } from './actions'

export default async function TypeSitePage() {
  const dataSiteType = (await getAllSitesType()) || []
  return (
    <main>
      <HeaderPage pageName={'Tipos de Sites'} />
      <div className="flex items-center justify-end space-y-2 pt-2">
        <DialogSiteType
          dialogButton={'Novo Tipo de Site'}
          dialogTitle={'Tipo de Site'}
          dialogDescription={'Tela para salvar um novo Tipo de Site'}
        />
      </div>
      <div>
        <DataTable columns={columns} data={dataSiteType} />
      </div>
    </main>
  )
}
