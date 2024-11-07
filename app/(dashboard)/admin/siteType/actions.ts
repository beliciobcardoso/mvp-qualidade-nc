'use server'
import prisma from '@/lib/prisma'
import { TipoSiteType } from '@/lib/types'

export async function getAllSitesType() {
  try {
    const data = await prisma.siteType.findMany()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function createSiteType(data: TipoSiteType) {
  try {
    const response = await prisma.siteType.create({
      data,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function updateTipoSiteType(data: TipoSiteType) {
  try {
    const response = await prisma.siteType.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function deleteSiteType(id: number) {
  try {
    const response = await prisma.siteType.delete({
      where: {
        id,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getSiteTypeById(id: number) {
  try {
    const response = await prisma.siteType.findUnique({
      where: {
        id,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getSiteTypeByName(name: string) {
  try {
    const response = await prisma.siteType.findFirst({
      where: {
        name,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
