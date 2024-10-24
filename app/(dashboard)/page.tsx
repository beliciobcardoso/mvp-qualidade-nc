import { DialogRelatorio } from '@/app/_components/relatorio/dialogRelatorio'
import ListaRelatorio from '@/app/_components/relatorio/listaRelatorio'

export default function Home() {
  return (
    <main className="flex flex-col gap-8 justify-center px-12 py-2">
      <div className="flex justify-end">
        <div className="flex justify-around">
          <DialogRelatorio
            dialogButton={'Criar Relatório'}
            dialogTitle={'Criar Relatório'}
            dialogDescription={'Tela para criar um novo relatório'}
          />
        </div>
      </div>
      <ListaRelatorio />
    </main>
  )
}
