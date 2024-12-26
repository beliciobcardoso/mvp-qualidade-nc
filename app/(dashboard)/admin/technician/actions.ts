'use server'
import prisma from '@/lib/prisma'
import type { TechnicianType } from '@/lib/types'
import type { Technician } from '@prisma/client'

export async function createTechnician(data: TechnicianType) {
  try {
    const technician = await prisma.technician.create({
      data: {
        ...data,
      },
    })
    return technician
  } catch (error) {
    console.log(error)
  }
}

export async function updateTechnician(data: Technician) {
  try {
    const technician = await prisma.technician.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })
    return technician
  } catch (error) {
    console.log(error)
  }
}

export async function getTechnicianByName(name: string) {
  try {
    const technician = await prisma.technician.findFirst({
      where: {
        name,
      },
    })
    return technician
  } catch (error) {
    console.log(error)
  }
}

export async function getTechnicianById(id: string) {
  try {
    const technician = await prisma.technician.findFirst({
      where: {
        id,
      },
    })
    return technician
  } catch (error) {
    console.log(error)
  }
}

export async function getAllTechnician() {
  try {
    const data = await prisma.technician.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
