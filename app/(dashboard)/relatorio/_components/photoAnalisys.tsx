'use client'
import imagem from '@/assets/image.svg'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { PhotoAnalisysType, Relatorio } from '@/lib/types'
import Image from 'next/image'
import PhotoCard from './photo/photoCard'
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

interface PhotoAnalisysProps {
  photoAnalisys: PhotoAnalisysType[]
  relatorioFinished: Relatorio
}

export default function PhotoAnalisys({ photoAnalisys, relatorioFinished }: PhotoAnalisysProps) {
  const [photos, setPhotos] = useState(photoAnalisys);

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
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPhotos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);
        handleOrderChange?.(newOrder);
        return newOrder;
      });
    }
  }

  const handleOrderChange = async (newOrder: PhotoAnalisysType[]) => {
    try {
      // Aqui você implementa a chamada à sua API para salvar a nova ordem
      const response = await fetch("/api/photos/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newOrder }),
      });
    } catch (error) {
      console.error("Erro ao salvar a nova ordem:", error);
      // Aqui você pode implementar uma notificação de erro para o usuário
    }
  };

  return (
    <>
      {photoAnalisys.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={photos.map((photo) => photo.id as number)}
            strategy={rectSortingStrategy}
          >

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {photos.map((item, index) => (
                <PhotoCard key={item.id} photo={item} index={index + 1} relatorioFinished={relatorioFinished} />
              ))}

            </div >
          </SortableContext>
        </DndContext>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Array.from({ length: 3 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Card key={index}>
              <div className="flex flex-col items-center truncate">
                <CardContent className="w-[430px] pt-2">
                  <Image src={imagem} alt="Imagem" width={400} height={400} />
                </CardContent>
                <CardFooter className="mb-2 grid w-full grid-flow-col p-0">
                  <div className="col-span-1 ml-2 border-2 py-1 text-center font-bold">
                    <p>{index + 1}</p>
                  </div>
                  <div className="col-span-6 mr-2 flex h-9 items-center justify-center border-y-2 border-r-2 font-bold">
                    <p>Descrição da foto {index + 1}</p>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )
      }
    </>
  )
}
