'use server'
import prisma from '@/lib/prisma'

export async function getAllStructuresType() {
  try {
    const data = await prisma.structureType.findMany()
    return data
  } catch (error) {
    console.log(error)
  }
}
