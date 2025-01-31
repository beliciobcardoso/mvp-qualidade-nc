import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = (p0: { log: string[] }) => {
  return new PrismaClient()
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma =
  globalThis.prismaGlobal ??
  prismaClientSingleton({
    log: ['query'],
  })

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
