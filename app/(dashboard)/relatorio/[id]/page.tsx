import {
  getDescriptionsId,
  getPhotoAnalisysById,
  getRelatorioById,
} from '@/app/(dashboard)/relatorio/actions'
import HeaderPage from '@/components/header-page'
import { auth } from '@/lib/auth'
import { PhotoAnalisysType, Relatorio } from '@/lib/types'
import { redirect } from 'next/navigation'
import HeaderReport from '../_components/headerReport'
import PhotoAnalisys from '../_components/photoAnalisys'

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) {
    redirect('/signin')
  }
  const id = parseInt(params.id)
  const photoAnalisys: PhotoAnalisysType[] = await getPhotoAnalisysById(id)
  const relatorioHeader: Relatorio = await getRelatorioById(id)
  const descriptions = await getDescriptionsId(id)

  return (
    <main>
      <HeaderPage pageName={'Analisando Relatório'} />
      <div className="flex w-full flex-col items-center bg-slate-300">
        <HeaderReport
          relatorioHeader={relatorioHeader}
          descriptions={descriptions}
          photoAnalisys={photoAnalisys}
          id={id}
        />
        <aside className="container flex flex-col items-center py-4">
          {
            <PhotoAnalisys
              photoAnalisys={photoAnalisys}
              relatorioHeader={relatorioHeader}
            />
          }
        </aside>
        <footer className="flex flex-col bg-white"></footer>
      </div>
    </main>
  )
}
