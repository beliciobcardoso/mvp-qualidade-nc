"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import Image from "next/image";

interface PhotoCardProps {
  id: string;
  imageUrl: string;
  index: number;
  description: string;
}

export function PhotoCard({ id, imageUrl, index, description }: PhotoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative bg-white rounded-lg shadow-md p-2 ${isDragging ? "opacity-50" : ""
        }`}
    >
      <div className="relative aspect-video">
        <div
          className="absolute top-2 right-2 cursor-grab active:cursor-grabbing p-1 rounded-md hover:bg-gray-100"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-5 h-5 text-gray-500" />
        </div>
        <Image
          src={imageUrl}
          alt={`Foto ${index + 1}`}
          className="w-full h-full object-cover rounded-md"
          width={300}
          height={300}
        />
        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
          {index + 1}
        </div>
      </div>

      <p className="mt-2 text-sm text-gray-700">{description}</p>
    </div>
  );
}