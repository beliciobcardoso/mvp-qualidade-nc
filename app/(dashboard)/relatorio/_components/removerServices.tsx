'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { deleteDescriptionService } from '../actions'

interface RemoveServicesProps {
  idService: number
  className?: string
}

export function RemoveServices({ idService, className }: RemoveServicesProps) {
  const router = useRouter()

  function handleDelete(idService: number) {
    deleteDescriptionService(idService)
    router.refresh()
  }
  return (
    <>
      <Button
        onClick={() => handleDelete(idService)}
        className={className}
        variant={'destructive'}
      >
        Del
      </Button>
    </>
  )
}
