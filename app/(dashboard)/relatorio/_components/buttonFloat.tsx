import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'

export default function ButtonFloat() {
  return (
    <div className="relative inline-block text-left">
      <Button className="fixed bottom-4 right-4 md:right-4 lg:right-10 xl:right-48 2xl:right-60 bg-blue-500 text-white w-12 h-12 rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
        <PlusIcon className="w-6 h-6" />
      </Button>
    </div>
  )
}
