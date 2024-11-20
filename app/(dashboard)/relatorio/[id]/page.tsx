import {
  getDescriptionsId,
  getPhotoAnalisysById,
  getRelatorioById,
} from '@/app/(dashboard)/relatorio/actions'
import HeaderPage from '@/components/header-page'
import { PhotoAnalisysType, Relatorio } from '@/lib/types'
import { PlusIcon } from 'lucide-react'
import HeaderReport from '../_components/headerReport'
import ModalAddCardPhoto from '../_components/modalAddCardPhoto'
import PhotoAnalisys from '../_components/photoAnalisys'

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const photoAnalisys: PhotoAnalisysType[] = await getPhotoAnalisysById(id)
  const relatorioHeader: Relatorio = await getRelatorioById(id)
  const descriptions = await getDescriptionsId(id)

  return (
    <main>
      <HeaderPage pageName={'Analisando Relatório'} />
      <div className="flex w-full flex-col items-center bg-slate-300">
        <ModalAddCardPhoto
          textButton={<PlusIcon className="h-6 w-6" />}
          textDescription={'Adicione uma nova foto'}
          textTitle={'Adicionar Foto'}
        />
        <HeaderReport
          relatorioHeader={relatorioHeader}
          descriptions={descriptions}
          id={id}
        />
        <aside className="container flex flex-col items-center py-4">
          {<PhotoAnalisys photoAnalisys={photoAnalisys} />}
        </aside>
        <footer className="flex flex-col bg-white"></footer>
      </div>
    </main>
  )
}
