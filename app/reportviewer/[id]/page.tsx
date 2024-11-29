import {
  getDescriptionsId,
  getPhotoAnalisysById,
  getRelatorioById,
} from '@/app/(dashboard)/relatorio/actions'
import { PhotoAnalisysType, Relatorio } from '@/lib/types'
import HeaderReport from '../_components/headerReport'
import PhotoAnalisys from '../_components/photoAnalisys'

export default async function reportViewer({
  params,
}: {
  params: { id: string }
}) {
  const id = parseInt(params.id)
  const photoAnalisys: PhotoAnalisysType[] = await getPhotoAnalisysById(id)
  const relatorioHeader: Relatorio = await getRelatorioById(id)
  const descriptions = await getDescriptionsId(id)

  return (
    <main>
      <div className="flex w-full flex-col items-center bg-slate-300">
        <HeaderReport
          relatorioHeader={relatorioHeader}
          descriptions={descriptions}
          photoAnalisys={photoAnalisys}
          id={id}
        />
        <aside className="container flex w-[780px] flex-col items-center py-4">
          <PhotoAnalisys photoAnalisys={photoAnalisys} />
        </aside>
        <footer className="flex flex-col bg-white"></footer>
      </div>
    </main>
  )
}
