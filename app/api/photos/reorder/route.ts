import { updateNewIndexPhotoAnalisys } from '@/app/(dashboard)/relatorio/actions'
import type { PhotoAnalisysType } from '@/lib/types'

export async function POST(request: Request) {
  const { newOrder } = await request.json()
  // console.log(newOrder)

  newOrder.forEach((photo: PhotoAnalisysType, index: number) => {
    // console.log(photo.id, index + 1)
    updateNewIndexPhotoAnalisys(photo.id as number, index + 1)
  })

  return new Response('OK')
}
