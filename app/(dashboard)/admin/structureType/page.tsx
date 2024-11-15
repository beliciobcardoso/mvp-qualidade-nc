import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'
import { DialogStructureType } from './_components/dialogStructureType'
import { getAllStructuresType } from './actions'

export default async function StructureTypePage() {
  const dataStructureType = (await getAllStructuresType()) || []
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Tipos de Estruturas
        </h2>
        <DialogStructureType
          dialogButton={'Novo Tipo de Estrutura'}
          dialogTitle={'Tipo de Estrutura'}
          dialogDescription={'Tela para salvar um novo Tipo de Estrutura'}
        />
      </div>
      <div>
        <DataTable columns={columns} data={dataStructureType} />
      </div>
    </div>
  )
}
