import { PhotoAnalisys } from '@/lib/types'
import { getPhotoAnalisysById } from '../actions'

export default async function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const relatorio: PhotoAnalisys[] = await getPhotoAnalisysById(id)

  return (
    <main>
      <h1>Relatório {id}</h1>
      <div>
        {relatorio.length > 0 ? (
          relatorio.map((item) => (
            <div key={item.id}>
              <h2>{item.url}</h2>
              <p>{item.name}</p>
            </div>
          ))
        ) : (
          <p>Não há dados para exibir</p>
        )}
      </div>
    </main>
  )
}
