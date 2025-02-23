'use client'
import imagem from '@/assets/image.svg'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import type { PhotoAnalisysType, Relatorio } from '@/lib/types'
import Image from 'next/image'
import EditPhoto from './editPhoto'
import RemovePhoto from './removePhoto'
import { GripVertical } from 'lucide-react'
import { useSortable } from "@dnd-kit/sortable";

interface PhotoAnalisysProps {
    photo: PhotoAnalisysType
    relatorioFinished: Relatorio
    index: number
}

export default function PhotoCard({ photo, relatorioFinished, index }: PhotoAnalisysProps) {
    const id = photo.id as number;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });
    return (
        <>
            <div className="">
                <Card key={photo.id} className="flex h-full flex-col items-center justify-between truncate">
                    <CardContent className="w-[430px] h-full flex flex-col justify-between pb-0 pt-2">
                        <div className="flex w-full justify-end pb-0">
                            {relatorioFinished.finishedAt ? (
                                <></>
                            ) : (
                                <div className="flex justify-between w-full items-center">
                                    <div>
                                        <div
                                            className="cursor-grab active:cursor-grabbing p-1 rounded-md hover:bg-gray-100 border-2"
                                            {...attributes}
                                            {...listeners}
                                        >
                                            <GripVertical className="w-5 h-5 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="gap-2 flex">
                                        <EditPhoto
                                            photoAnalisys={photo}
                                            index={index + 1}
                                            dialogTitle={'Editar Foto'}
                                            dialogDescription={'Tela para editar uma foto'}
                                        />
                                        <RemovePhoto
                                            photoAnalisys={photo}
                                            index={index + 1}
                                            dialogButton={'X'}
                                            dialogTitle={'Excluir Foto'}
                                            dialogDescription={'Tela para excluir uma foto'}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex-grow flex items-center justify-center pt-2 pb-0 px-0">
                            <Image src={photo.url} alt="Imagem" width={380} height={380} />
                        </div>
                    </CardContent>
                    <CardFooter className="mb-2 flex justify-center max-h-20 w-full p-2">
                        <div className="flex h-full items-center justify-center border-2 py-1 font-bold">
                            <p className="text-center w-12">{index + 1}</p>
                        </div>
                        <div className="h-full border-2 p-2">
                            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                            <div dangerouslySetInnerHTML={{ __html: photo.description }} className="w-80 max-h-14 text-wrap" />
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
