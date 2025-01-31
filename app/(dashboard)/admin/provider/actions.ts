'use server'
import prisma from '@/lib/prisma'
import type { Provider } from '@prisma/client'

export async function createProvider(data: Provider) {
  try {
    const provider = await prisma.provider.create({
      data: {
        name: data.name,
      },
    })
    return provider
  } catch (error) {
    console.log(error)
  }
}

export async function updateProvider(data: Provider) {
  try {
    const provider = await prisma.provider.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })
    return provider
  } catch (error) {
    console.log(error)
  }
}

export async function getProviderByName(name: string) {
  try {
    const provider = await prisma.provider.findFirst({
      where: {
        name,
      },
    })
    return provider
  } catch (error) {
    console.log(error)
  }
}

export async function getProviderById(id: string) {
  try {
    const provider = await prisma.provider.findFirst({
      where: {
        id,
      },
    })
    return provider
  } catch (error) {
    console.log(error)
  }
}

export async function getAllProvider() {
  try {
    const data = await prisma.provider.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
