// import { PrismaClient } from '@prisma/client';
// import { withAccelerate } from '@prisma/extension-accelerate';
// import 'server-only';

// const globalForPrisma = globalThis as unknown as {
// 	prisma: PrismaClient | undefined;
// };

// export const db =
// 	globalForPrisma.prisma ??
// 	new PrismaClient({
// 		log:
// 			process.env.NODE_ENV === 'development'
// 				? ['query', 'error', 'warn']
// 				: ['error'],
// 	}).$extends(withAccelerate());

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development' ? ['info', 'warn', 'error', 'query'] : ['info', 'warn', 'error', 'query'],
  })
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
