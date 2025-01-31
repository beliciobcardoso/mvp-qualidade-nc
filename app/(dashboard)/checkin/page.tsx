import { DialogCheckInForm } from '@/app/(dashboard)/checkin/_components/dialogRelatorioForm'
import { getRelatorios } from '@/app/(dashboard)/relatorio/actions'
import HeaderPage from '@/components/header-page'
import { auth } from '@/lib/auth'
import type { User } from '@/lib/types'
import { getAllClient } from '../admin/client/actions'
import { getAllScopeService } from '../admin/scopeService/actions'
import { getAllSites } from '../admin/site/actions'
import { getAllTechnician } from '../admin/technician/actions'
import { getUserByEmail } from '../admin/user/actions'
import { columns } from './_components/table/columnDef'
import { TableData } from './_components/table/tableRelatorio'
import { getAllProvider } from '../admin/provider/actions'

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
    const scopeServiceData = (await getAllScopeService()) || []
    const data = await getRelatorios()
    const providerData = (await getAllProvider()) || []
    // const dataUser = (await getUserByEmail('pedro.doe@email.com')) || undefined

    return (
        <main>
            <HeaderPage pageName={'Check-in'} />
            <div className="flex items-center justify-end space-y-2 pt-2">
                <DialogCheckInForm
                    dialogProps={{
                        dialogButton: 'Criar Check-in',
                        dialogTitle: 'Criar Check-in',
                        dialogDescription: 'Tela para criar um novo Check-in',
                    }}
                    providerData={providerData}
                    dataUser={dataUser}
                />
            </div>
            <div className="flex flex-col items-center gap-8 pl-2">
                <TableData data={data} columns={columns} />
            </div>
        </main>
    )
}
