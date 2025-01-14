'use server'
import type { ScopeServiceSchema } from '@/lib/formValidationSchemas'
import prisma from '@/lib/prisma'
import type { ScopeService } from '@prisma/client'

export async function createScopeService(data: ScopeServiceSchema) {
  try {
    const scopeService = await prisma.scopeService.create({
      data: {
        ...data,
      },
    })
    return scopeService
  } catch (error) {
    console.log(error)
  }
}

export async function updateScopeService(data: ScopeService) {
  try {
    const scopeService = await prisma.scopeService.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })
    return scopeService
  } catch (error) {
    console.log(error)
  }
}

export async function getScopeServiceByName(name: string) {
  try {
    const scopeService = await prisma.scopeService.findFirst({
      where: {
        name,
      },
    })
    return scopeService
  } catch (error) {
    console.log(error)
  }
}

export async function getScopeServiceById(id: number) {
  try {
    const scopeService = await prisma.scopeService.findFirst({
      where: {
        id,
      },
    })
    return scopeService
  } catch (error) {
    console.log(error)
  }
}

export async function getAllScopeService() {
  try {
    const data = await prisma.scopeService.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
