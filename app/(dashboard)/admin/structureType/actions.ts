'use server'
import prisma from '@/lib/prisma'
import { StructureTypeType } from '@/lib/types'

export async function getAllStructuresType() {
  try {
    const data = await prisma.structureType.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function createStructureType(data: StructureTypeType) {
  try {
    const response = await prisma.structureType.create({
      data,
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function updateStructureType(data: StructureTypeType) {
  try {
    const response = await prisma.structureType.update({
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

export async function deleteStructureType(id: number) {
  try {
    const response = await prisma.structureType.delete({
      where: {
        id,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getStructureTypeById(id: number) {
  try {
    const response = await prisma.structureType.findUnique({
      where: {
        id,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function getStructureTypeByName(name: string) {
  try {
    const response = await prisma.structureType.findFirst({
      where: {
        name,
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
