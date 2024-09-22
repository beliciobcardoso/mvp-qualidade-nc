import { DialogRelatorio } from './_components/relatorio/dialogRelatorio'
import ListaRelatorio from './_components/relatorio/listaRelatorio'

export default function Home() {
  return (
    <main className="flex flex-col gap-8 justify-center px-12 py-2">
      <div className="flex justify-between">
        <h1 className="text-4xl">Home</h1>
        <DialogRelatorio />
      </div>
      <ListaRelatorio />
    </main>
  )
}
