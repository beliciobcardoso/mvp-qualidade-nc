'use client'

import PhotoCard from './photoCard'

interface Photo {
  id: number
  title: string
  url: string
  description: string
}

interface PhotoListProps {
  initialData: Photo[]
}

const Component: React.FC<PhotoListProps> = ({ initialData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {initialData.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  )
}

export default Component
