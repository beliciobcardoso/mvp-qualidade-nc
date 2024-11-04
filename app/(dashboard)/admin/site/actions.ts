'use server'
import prisma from '@/lib/prisma'
import { Site } from '@prisma/client'

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
            name: true,
          },
        },
        structureType: {
          select: {
            name: true,
          },
        },
        siteType: {
          select: {
            name: true,
          },
        },
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
