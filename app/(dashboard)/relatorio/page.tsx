import { DialogRelatorioForm } from '@/app/(dashboard)/relatorio/_components/dialogRelatorioForm'
import ListaRelatorio from '@/app/(dashboard)/relatorio/_components/listaRelatorio'
import { getAllClient } from '../admin/client/actions'
import { getAllSites } from '../admin/site/actions'
import { getAllTechnician } from '../admin/technician/actions'
import { getUserByEmail } from '../admin/user/actions'

export default async function RelatorioPage() {
  const clientData = (await getAllClient()) || []
  const technicianData = (await getAllTechnician()) || []
  const siteData = (await getAllSites()) || []
  const dataUser = (await getUserByEmail('pedro.doe@email.com')) || undefined

  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
        <DialogRelatorioForm
          dialogButton={'Criar Relatório'}
          dialogTitle={'Criar Relatório'}
          dialogDescription={'Tela para criar um novo relatório'}
          dataUser={dataUser}
          clientData={clientData}
          technicianData={technicianData}
          siteData={siteData}
        />
      </div>
      <ListaRelatorio />
    </main>
  )
}
