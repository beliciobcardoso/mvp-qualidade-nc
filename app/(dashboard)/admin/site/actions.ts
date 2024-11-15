'use server'
import prisma from '@/lib/prisma'
import { Site } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function createSite(site: Site) {
  try {
    const data = await prisma.site.create({
      data: {
        ...site,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updateSite(site: Site) {
  try {
    const data = await prisma.site.update({
      where: {
        id: site.id,
      },
      data: {
        ...site,
      },
    })
    revalidatePath('/admin/site')
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getSiteById(id: number) {
  try {
    const data = await prisma.site.findUnique({
      where: {
        id,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getSiteByName(idSite: string) {
  try {
    const data = await prisma.site.findFirst({
      where: {
        idSite,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getAllSites() {
  try {
    const data = await prisma.site.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        structureType: {
          select: {
            id: true,
            name: true,
          },
        },
        siteType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        idSite: 'asc',
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getSiteByClientName(clientId: string) {
  try {
    const data = await prisma.site.findMany({
      where: {
        idClient: clientId,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
