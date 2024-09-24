'use server'
import { prisma } from '@/lib/prisma'
import { PhotoAnalisys } from '@/lib/types'

export async function savePhotoAnalisys(data: PhotoAnalisys) {
  // save relatorio to database asynchronously
  if (data.id) {
    return await prisma.photoAnalisys.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })
  }

  return await prisma.photoAnalisys.create({
    data: {
      ...data,
    },
  })
}

export async function getPhotoAnalisys() {
  return await prisma.photoAnalisys.findMany()
}
