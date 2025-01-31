import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export default function ButtonFloat() {
  return (
    <div className="relative inline-block text-left">
      <Button className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 md:right-4 lg:right-10 xl:right-48 2xl:right-60">
        <PlusIcon className="h-6 w-6" />
      </Button>
    </div>
  )
}
