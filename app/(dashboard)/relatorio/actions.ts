'use server'
import { CONFIG } from '@/config'
import prisma from '@/lib/prisma'
import {
  DescriptionAnalisysType,
  PhotoAnalisysType,
  Relatorio,
  ReportCreateType,
  ReportRelType,
} from '@/lib/types'
import validateImageType from '@/lib/validateImageType'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { Client, Report } from '@prisma/client'

const clientS3 = new S3Client({
  region: CONFIG.providers.storage.region,
  endpoint: CONFIG.providers.storage.endpoint,
  credentials: {
    accessKeyId: CONFIG.providers.storage.accessKeyId,
    secretAccessKey: CONFIG.providers.storage.secretAccessKey,
  },
})

// function validateImageType(file: File) {
//   if (file.type.startsWith('image/')) return true
//   console.log('Please select a valid image')
//   return false
// }

// const exists = async (bucket: string) => {
//   try {
//     await clientS3.send(new HeadBucketCommand({ Bucket: bucket }))
//     return true
//   } catch (error) {
//     return false
//   }
// }

export async function upLoadPhotoAnalisys(
  formData: FormData,
  idReport: number,
) {
  // if (!(await exists(CONFIG.providers.storage.bucket))) {
  //   console.log('Bucket does not exist')

  //   const command = new CreateBucketCommand({
  //     ACL: 'public-read',
  //     Bucket: CONFIG.providers.storage.bucket,
  //     CreateBucketConfiguration: {
  //       LocationConstraint: 'EU',
  //     },
  //   })

  //   const response = await clientS3.send(command)

  //   console.log('Bucket created:', response)
  // }

  const file = formData.get('file') as File

  const binaryFile = await file.arrayBuffer()
  const fileBuffer = Buffer.from(binaryFile)

  const keyName = `reports/${idReport}/${file.name}`

  // upload file to storage asynchronously
  const uploadParams = {
    Bucket: CONFIG.providers.storage.bucket,
    Key: keyName,
    Body: fileBuffer,
    ContentType: file.type,
  }

  if (validateImageType(file)) {
    await clientS3.send(new PutObjectCommand(uploadParams))
    const url = `${CONFIG.providers.storage.endpoint}/${CONFIG.providers.storage.bucket}/${keyName}`
    return url
  } else {
    return null
  }
}

export async function savePhotoAnalisys(data: PhotoAnalisysType) {
  // save relatorio to database asynchronously
  if (data.id) {
    return await prisma.photoAnalisys.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })
  }

  return await prisma.photoAnalisys.create({
    data: {
      ...data,
    },
  })
}

export async function getPhotoAnalisys() {
  return await prisma.photoAnalisys.findMany()
}

export async function getPhotoAnalisysById(id: number) {
  const photoAnalisys = await prisma.photoAnalisys.findMany({
    where: {
      idReport: id,
    },
  })

  return photoAnalisys
}

export async function upsetDescriptionAnalisys(data: DescriptionAnalisysType) {
  return await prisma.descriptionAnalisys.create({
    data: {
      ...data,
    },
  })
}

export async function getDescriptionsId(id: number) {
  const idReport = id

  return await prisma.descriptionAnalisys.findMany({
    select: {
      id: true,
      idReport: true,
      service: true,
      status: true,
    },
    where: {
      idReport,
    },
  })
}

export async function deleteDescriptionService(id: number) {
  return await prisma.descriptionAnalisys.delete({
    where: {
      id,
    },
  })
}

export async function createReport(report: ReportCreateType) {
  const userId = await prisma.user.findUnique({
    where: {
      id: report.userId,
    },
    select: {
      id: true,
    },
  })

  if (!userId) {
    console.error('User not found')
    return
  }

  try {
    const data = await prisma.report.create({
      data: {
        clientId: report.clientId,
        siteId: report.siteId,
        technicianId: report.technicianId,
        dateService: report.dateService,
        userId: userId?.id,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function updateReport(data: Report) {
  return await prisma.report.update({
    where: {
      id: data.id,
    },
    data: {
      siteId: data.siteId,
      clientId: data.clientId,
      technicianId: data.technicianId,
      dateService: data.dateService,
    },
  })
}

export async function getRelatorios() {
  const relatorios = await prisma.report.findMany({
    select: {
      id: true,
      siteId: true,
      clientId: true,
      technicianId: true,
      dateService: true,
      createdAt: true,
      updatedAt: true,
      finishedAt: true,
      sites: {
        select: {
          id: true,
          idSite: true,
          altura: true,
          endereco: true,
          bairro: true,
          cidade: true,
          numero: true,
          uf: true,
          idClient: true,
          siteTypeId: true,
          structureTypeId: true,
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
      },
      client: {
        select: {
          id: true,
          name: true,
        },
      },
      technician: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  return relatorios as ReportRelType[]
}

export async function getRelatorioById(id: number) {
  const relatorio = await prisma.report.findUnique({
    where: {
      id,
    },
    include: {
      technician: {
        select: {
          name: true,
        },
      },
      client: {
        select: {
          name: true,
          img: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      sites: {
        select: {
          id: true,
          idSite: true,
          altura: true,
          endereco: true,
          bairro: true,
          cidade: true,
          numero: true,
          uf: true,
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
      },
    },
  })
  return relatorio as Relatorio
}

export async function saveClient(data: Client) {
  return await prisma.client.create({
    data: {
      ...data,
    },
  })
}

export async function getClients() {
  return await prisma.client.findMany()
}

export async function getClientById(id: string) {
  return await prisma.client.findUnique({
    where: {
      id,
    },
  })
}

export async function getClientByName(name: string) {
  return await prisma.client.findMany({
    where: {
      name,
    },
  })
}

export async function getClientByPartialName(partialName: string) {
  return await prisma.client.findMany({
    where: {
      name: {
        contains: partialName,
        mode: 'insensitive',
      },
    },
  })
}
