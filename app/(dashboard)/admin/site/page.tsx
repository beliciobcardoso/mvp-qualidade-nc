import HeaderPage from '@/components/header-page'
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
    <main>
      <HeaderPage pageName={'Sites'} />
      <div className="flex items-center justify-end space-y-2 pt-2">
        <DialogSite
          dialogButton={'Novo Site'}
          dialogTitle={'Site'}
          dialogDescription={'Tela para Criar um novo Site'}
          structureData={structureData}
          siteTypeData={siteTypeData}
          clientData={clientData}
        />
      </div>
      <div>
        <DataTable data={siteData} columns={columns} />
      </div>
    </main>
  )
}
