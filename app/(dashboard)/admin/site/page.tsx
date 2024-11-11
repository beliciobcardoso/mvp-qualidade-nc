import { getAllClient } from '../client/actions'
import { getAllSitesType } from '../siteType/actions'
import { getAllStructuresType } from '../structureType/actions'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogSite } from './_components/dialogSite'
import { getAllSites } from './actions'

export default async function Site() {
  const siteData = ((await getAllSites()) || []).map((site) => ({
    ...site,
    altura: site.altura || '',
  }))
  const structureData = (await getAllStructuresType()) || []
  const siteTypeData = (await getAllSitesType()) || []
  const clientData = (await getAllClient()) || []
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sites</h2>
        <DialogSite
          dialogButton={'Novo Site'}
          dialogTitle={'Salvar Site'}
          dialogDescription={'Tela para Salvar um novo Site'}
          structureData={structureData}
          siteTypeData={siteTypeData}
          clientData={clientData}
        />
      </div>
      <div>
        <DataTable data={siteData} columns={columns} />
      </div>
    </div>
  )
}
