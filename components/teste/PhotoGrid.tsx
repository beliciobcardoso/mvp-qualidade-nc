"use client";
import { PhotoCard } from "@/components/teste/PhotoCard";
import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";


export type Photo = {
  id: string;
  imageUrl: string;
  description: string;
};

// interface Photo {
//   id: string;
//   imageUrl: string;
//   description: string;
// }

interface PhotoGridProps {
  initialPhotos: Photo[];
  onOrderChange?: (newOrder: Photo[]) => void;
}

export function PhotoGrid({ initialPhotos, onOrderChange }: PhotoGridProps) {
  const [photos, setPhotos] = useState(initialPhotos);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPhotos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);
        onOrderChange?.(newOrder);
        return newOrder;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={photos.map(p => p.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              id={photo.id}
              index={index}
              imageUrl={photo.imageUrl}
              description={photo.description}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}