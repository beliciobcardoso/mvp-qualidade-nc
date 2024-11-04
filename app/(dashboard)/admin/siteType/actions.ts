'use server'
import prisma from '@/lib/prisma'

export async function getAllSiteType() {
  try {
    const data = await prisma.siteType.findMany()
    return data
  } catch (error) {
    console.log(error)
  }
}
