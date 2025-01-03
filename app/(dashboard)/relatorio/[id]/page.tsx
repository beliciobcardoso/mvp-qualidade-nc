import { getDescriptionsId, getPhotoAnalisysById, getRelatorioById } from '@/app/(dashboard)/relatorio/actions'
import HeaderPage from '@/components/header-page'
import { auth } from '@/lib/auth'
import type { PhotoAnalisysType, Relatorio, User } from '@/lib/types'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import HeaderReport from '../_components/headerReport'
import PhotoAnalisys from '../_components/photoAnalisys'


export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth()

  const user = session?.user as User
  let dataUser: User | null = null

  if (!session) {
    redirect('/signin')
  } else {
    dataUser = user
  }
  const id = Number.parseInt(params.id)
  const photoAnalisys: PhotoAnalisysType[] = await getPhotoAnalisysById(id)
  const relatorioHeader: Relatorio = await getRelatorioById(id)
  const descriptions = await getDescriptionsId(id)

  return (
    <main>
      <HeaderPage pageName={`Analisando Relatório - ${id}`} />
      <div className="flex w-full flex-col items-center bg-slate-300">
        <Suspense fallback={<div>Loading...</div>}>
          <HeaderReport
            relatorioHeader={relatorioHeader}
            descriptions={descriptions}
            photoAnalisys={photoAnalisys}
            id={id}
            user={dataUser}
          />
        </Suspense>
        <aside className="container flex flex-col items-center py-4">
          {<PhotoAnalisys photoAnalisys={photoAnalisys} relatorioHeader={relatorioHeader} />}
        </aside>
      </div>
    </main>
  )
}
