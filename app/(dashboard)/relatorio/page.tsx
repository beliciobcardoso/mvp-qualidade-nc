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
    <main className="flex flex-col justify-center gap-8 px-12 py-2">
      <div className="flex justify-end">
        <div className="flex justify-around">
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
      </div>
      <ListaRelatorio />
    </main>
  )
}
