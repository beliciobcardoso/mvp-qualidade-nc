import HeaderPage from '@/components/header-page'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogStructureType } from './_components/dialogStructureType'
import { getAllStructuresType } from './actions'

export default async function StructureTypePage() {
  const dataStructureType = (await getAllStructuresType()) || []
  return (
    <main>
      <HeaderPage pageName={'Tipos de Estruturas'} />
      <div className="flex items-center justify-end space-y-2 pt-2">
        <DialogStructureType
          dialogButton={'Novo Tipo de Estrutura'}
          dialogTitle={'Tipo de Estrutura'}
          dialogDescription={'Tela para salvar um novo Tipo de Estrutura'}
        />
      </div>
      <div>
        <DataTable columns={columns} data={dataStructureType} />
      </div>
    </main>
  )
}
