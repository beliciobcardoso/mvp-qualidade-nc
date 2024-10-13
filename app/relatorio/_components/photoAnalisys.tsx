import { PhotoAnalisysType } from '@/lib/types'

export default function PhotoAnalisys({
  photoAnalisys,
}: {
  photoAnalisys: PhotoAnalisysType[]
}) {
  return (
    <div>
      {photoAnalisys.map((item) => (
        <div key={item.id}>
          <h2>{item.url}</h2>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  )
}
