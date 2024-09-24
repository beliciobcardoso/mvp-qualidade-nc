'use server'
import { prisma } from '@/lib/prisma'
import { Relatorio } from '@/lib/types'

export async function saveRelatorio(data: Relatorio) {
  // save relatorio to database asynchronously
  if (data.id) {
    return await prisma.report.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    })
  }

  return await prisma.report.create({
    data: {
      ...data,
    },
  })
}

export async function getRelatorios() {
  const relatorios = await prisma.report.findMany()
  return relatorios as Relatorio[]
}
