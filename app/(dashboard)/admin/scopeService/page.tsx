import HeaderPage from '@/components/header-page'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogScopeService } from './_components/dialogScopeService'
import { getAllScopeService } from './actions'

export default async function ScopeServicePage() {
    const dataScopeService = (await getAllScopeService()) || []
    return (
        <main>
            <HeaderPage pageName={'Escopo do Serviço'} />
            <div className="flex items-center justify-end space-y-2 pt-2">
                <DialogScopeService
                    dialogButton={'Novo Escopo do Serviço'}
                    dialogTitle={'Escopo do Serviço'}
                    dialogDescription={'Tela para salvar um novo Escopo do Serviço'}
                />
            </div>
            <div>
                <DataTable columns={columns} data={dataScopeService} />
            </div>
        </main>
    )
}
