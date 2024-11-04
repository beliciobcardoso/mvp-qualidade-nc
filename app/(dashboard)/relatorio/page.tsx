import { DialogRelatorioForm } from '@/app/(dashboard)/relatorio/_components/dialogRelatorioForm'
import ListaRelatorio from '@/app/(dashboard)/relatorio/_components/listaRelatorio'
import { dataUser } from '../layout'

export default function RelatorioPage() {
  return (
    <main className="flex flex-col gap-8 justify-center px-12 py-2">
      <div className="flex justify-end">
        <div className="flex justify-around">
          <DialogRelatorioForm
            dialogButton={'Criar Relatório'}
            dialogTitle={'Criar Relatório'}
            dialogDescription={'Tela para criar um novo relatório'}
            dataUser={dataUser.user}
          />
        </div>
      </div>
      <ListaRelatorio />
    </main>
  )
}
