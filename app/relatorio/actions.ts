'use server'
import { prisma } from '@/lib/prisma'
import { DescriptionAnalisysType, PhotoAnalisys } from '@/lib/types'

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

export async function getPhotoAnalisysById(id: number) {
  const photoAnalisys = await prisma.photoAnalisys.findMany({
    where: {
      idReport: id,
    },
  })

  return photoAnalisys
}

export async function upsetDescriptionAnalisys(data: DescriptionAnalisysType) {
  return await prisma.descriptionAnalisys.create({
    data: {
      ...data,
    },
  })
}

export async function getDescriptionsId(id: number) {
  const idReport = id

  return await prisma.descriptionAnalisys.findMany({
    select: {
      id: true,
      idReport: true,
      services: true,
      status: true,
    },
    where: {
      idReport,
    },
  })
}
