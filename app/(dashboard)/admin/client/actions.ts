'use server'
import prisma from '@/lib/prisma'

export async function getAllClient() {
  try {
    const data = await prisma.client.findMany()
    return data
  } catch (error) {
    console.log(error)
  }
}
