import { PhotoAnalisys } from '@/lib/types'
import { getPhotoAnalisys } from '../actions'

export default async function Page({ params }: { params: { id: string } }) {
  const relatorio: PhotoAnalisys[] = await getPhotoAnalisys()
  return (
    <div>
      {relatorio.map((photo: PhotoAnalisys) => (
        <div key={photo.id}>
          <div>{photo.url}</div>
          <div>{photo.name}</div>
        </div>
      ))}
    </div>
  )
}
