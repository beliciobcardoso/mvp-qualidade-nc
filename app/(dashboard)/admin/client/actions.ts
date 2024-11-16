'use server'
import { CONFIG } from '@/config'
import prisma from '@/lib/prisma'
import { ClientType } from '@/lib/types'
import validateImageType from '@/lib/validateImageType'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Client } from '@prisma/client'

const clientS3 = new S3Client({
  region: CONFIG.providers.storage.region,
  endpoint: CONFIG.providers.storage.endpoint,
  credentials: {
    accessKeyId: CONFIG.providers.storage.accessKeyId,
    secretAccessKey: CONFIG.providers.storage.secretAccessKey,
  },
})

export async function uploadClientLogo(formData: FormData, idClient: string) {
  const file = formData.get('file') as File

  const binaryFile = await file.arrayBuffer()
  const fileBuffer = Buffer.from(binaryFile)

  const keyName = `clients/${idClient}/logo/${file.name}`

  const command = new PutObjectCommand({
    Bucket: CONFIG.providers.storage.bucket,
    Key: keyName,
    Body: fileBuffer,
    ContentType: file.type,
  })

  if (validateImageType(file)) {
    try {
      await clientS3.send(command)
      const url = `${CONFIG.providers.storage.endpoint}/${CONFIG.providers.storage.bucket}/${keyName}`
      return url
    } catch (error) {
      console.log(error)
      return null
    }
  } else {
    return null
  }
}

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
