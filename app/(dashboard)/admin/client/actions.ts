'use server'
import prisma from '@/lib/prisma'
import { ClientType } from '@/lib/types'
import { Client } from '@prisma/client'

export async function createClient(data: ClientType) {
  try {
    const client = await prisma.client.create({
      data: {
        ...data,
      },
    })
    return client
  } catch (error) {
    console.log(error)
  }
}

export async function updateClient(data: Client) {
  try {
    const client = await prisma.client.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })
    return client
  } catch (error) {
    console.log(error)
  }
}

export async function getClientByName(name: string) {
  try {
    const client = await prisma.client.findFirst({
      where: {
        name,
      },
    })
    return client
  } catch (error) {
    console.log(error)
  }
}

export async function getClientById(id: string) {
  try {
    const client = await prisma.client.findFirst({
      where: {
        id,
      },
    })
    return client
  } catch (error) {
    console.log(error)
  }
}

export async function getAllClient() {
  try {
    const data = await prisma.client.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
