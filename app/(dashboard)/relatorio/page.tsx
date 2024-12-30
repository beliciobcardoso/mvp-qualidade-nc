import { DialogRelatorioForm } from '@/app/(dashboard)/relatorio/_components/dialogRelatorioForm'
import { getRelatorios } from '@/app/(dashboard)/relatorio/actions'
import HeaderPage from '@/components/header-page'
import { auth } from '@/lib/auth'
import type { User } from '@/lib/types'
import { getAllClient } from '../admin/client/actions'
import { getAllSites } from '../admin/site/actions'
import { getAllTechnician } from '../admin/technician/actions'
import { getUserByEmail } from '../admin/user/actions'
import { columns } from './_components/table/columnDef'
import { TableRelatorio } from './_components/table/tableRelatorio'

export default async function RelatorioPage() {
  const session = await auth()
  const user = session?.user as User
  let dataUser: User | undefined
  if (session) {
    dataUser = (await getUserByEmail(user.email)) || undefined
  }

  const clientData = (await getAllClient()) || []
  const technicianData = (await getAllTechnician()) || []
  const siteData = (await getAllSites()) || []
  const data = await getRelatorios()
  // const dataUser = (await getUserByEmail('pedro.doe@email.com')) || undefined

  return (
    <main>
      <HeaderPage pageName={'Relatórios'} />
      <div className="flex items-center justify-end space-y-2 pt-2">
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
      <div className="flex flex-col items-center gap-8 pl-2">
        <TableRelatorio data={data} columns={columns} />
      </div>
    </main>
  )
}
