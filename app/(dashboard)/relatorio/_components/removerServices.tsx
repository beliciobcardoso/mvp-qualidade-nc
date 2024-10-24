'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { deleteDescriptionService } from '../actions'

export function RemoveServices({ idService }: { idService: number }) {
  const router = useRouter()

  function handleDelete(idService: number) {
    deleteDescriptionService(idService)
    router.refresh()
  }
  return (
    <>
      <Button onClick={() => handleDelete(idService)} variant={'destructive'}>
        Del
      </Button>
    </>
  )
}
